import { Router } from "express";

import multer from "multer";
import uploadConfig from "./config/upload";
const upload = multer(uploadConfig);

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAtLeastVolunteer } from "./middlewares/ensureAtLeastVolunteer";
import { ensureAdmin } from "./middlewares/ensureAdmin";

import { CreateUserController } from "./controllers/users/CreateUserController";
import { ShowAuthenticatedUserController } from "./controllers/users/ShowUserByIdController";
import { ListAllUsersController } from "./controllers/users/ListAllUsersController";
import { EditUserController } from "./controllers/users/EditUserController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { DeleteSpecificUserController } from "./controllers/users/DeleteSpecificUserController";
import { UpdateUserAvatarController } from "./controllers/users/UpdateUserAvatarController";

import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController";

import { CreateAnimalController } from "./controllers/animals/CreateAnimalController";
import { ShowAnimalController } from "./controllers/animals/ShowAnimalController";
import { ListAnimalsController } from "./controllers/animals/ListAnimalsController";
import { EditAnimalController } from "./controllers/animals/EditAnimalController";
import { DeleteAnimalController } from "./controllers/animals/DeleteAnimalController";
import { ListAnimalReservationsController } from "./controllers/animals/ListAnimalReservationsController";

import { CreateReservationController } from "./controllers/reservations/CreateReservationController";
import { ApproveReservationController } from "./controllers/reservations/ApproveReservationController";
import { DisapproveReservationController } from "./controllers/reservations/DisapproveReservationController";
import { ConfirmAdoptionController } from "./controllers/reservations/ConfirmAdoptionController";
import { ListNewReservationsController } from "./controllers/reservations/ListNewReservationsController";

import { CreateTaskController } from "./controllers/tasks/CreateTaskController";
import { ListTasksFromAnimalController } from "./controllers/tasks/ListTasksFromAnimalController";
import { EditTaskController } from "./controllers/tasks/EditTaskController";
import { DeleteTaskController } from "./controllers/tasks/DeleteTaskController";

const router = Router();

const authenticateUser = new AuthenticateUserController();
const createUserController = new CreateUserController();
const showAuthenticatedUserController = new ShowAuthenticatedUserController();
const editUserController = new EditUserController();
const deleteUserController = new DeleteUserController();
const deleteSpecificUserController = new DeleteSpecificUserController();
const listAllUsersController = new ListAllUsersController();

const updateUserAvatarController = new UpdateUserAvatarController();

const createAnimalController = new CreateAnimalController();
const showAnimalController = new ShowAnimalController();
const listAnimalsController = new ListAnimalsController();
const editAnimalController = new EditAnimalController();
const deleteAnimalController = new DeleteAnimalController();
const listAnimalReservationsController = new ListAnimalReservationsController();

const createReservationController = new CreateReservationController();
const approveReservationController = new ApproveReservationController();
const disapproveReservationController = new DisapproveReservationController();
const confirmAdoptionController = new ConfirmAdoptionController();
const listNewReservationsController = new ListNewReservationsController();

const createTaskController = new CreateTaskController();
const listTasksFromAnimalController = new ListTasksFromAnimalController();
const editTaskController = new EditTaskController();
const deleteTaskController = new DeleteTaskController();

router.post("/login", authenticateUser.handle);
router.post("/user", createUserController.handle);
router.get(
  "/user",
  ensureAuthenticated,
  showAuthenticatedUserController.handle
);
router.get(
  "/user/:userId",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  showAuthenticatedUserController.handle
);
router.put("/user", ensureAuthenticated, editUserController.handle);
router.delete("/user", ensureAuthenticated, deleteUserController.handle);
router.delete(
  "/user/:id",
  ensureAuthenticated,
  ensureAdmin,
  deleteSpecificUserController.handle
);
router.get(
  "/users",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  listAllUsersController.handle
);
router.patch(
  "/user/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

router.post(
  "/animal",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  upload.array("images"),
  createAnimalController.handle
);
router.get("/animal/:id", showAnimalController.handle);
router.get("/animals", listAnimalsController.handle);
router.put(
  "/animal/:id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  editAnimalController.handle
);
router.delete(
  "/animal/:id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  deleteAnimalController.handle
);
router.get(
  "/animal/reservations/:animal_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  listAnimalReservationsController.handle
);

router.post(
  "/reservation",
  ensureAuthenticated,
  createReservationController.handle
);
router.post(
  "/reservation/approve/:reservation_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  approveReservationController.handle
);
router.post(
  "/reservation/disapprove/:reservation_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  disapproveReservationController.handle
);
router.post(
  "/reservation/adopt/:reservation_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  confirmAdoptionController.handle
);
router.get(
  "/reservations/new",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  listNewReservationsController.handle
);
router.get(
  "/reservations/approved",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  listNewReservationsController.handle
);
router.get(
  "/reservations/disapproved",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  listNewReservationsController.handle
);

router.post(
  "/task/:animal_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  createTaskController.handle
);
router.get(
  "/tasks/:animal_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  listTasksFromAnimalController.handle
);
router.put(
  "/task/:task_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  editTaskController.handle
);
router.delete(
  "/task/:task_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  deleteTaskController.handle
);

export { router };
