import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAtLeastVolunteer } from "./middlewares/ensureAtLeastVolunteer";
import { ensureAdmin } from "./middlewares/ensureAdmin";

import { CreateUserController } from "./controllers/users/CreateUserController";
import { ShowAuthenticatedUserController } from "./controllers/users/ShowUserByIdController";
import { ListAllUsersController } from "./controllers/users/ListAllUsersController";
import { EditUserController } from "./controllers/users/EditUserController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { DeleteSpecificUserController } from "./controllers/users/DeleteSpecificUserController";

import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController";

import { CreateAnimalController } from "./controllers/animals/CreateAnimalController";
import { ShowAnimalController } from "./controllers/animals/ShowAnimalController";
import { ListAnimalsController } from "./controllers/animals/ListAnimalsController";
import { EditAnimalController } from "./controllers/animals/EditAnimalController";
import { DeleteAnimalController } from "./controllers/animals/DeleteAnimalController";
import { ListAnimalReservationsController } from "./controllers/animals/ListAnimalReservationsController";

import { CreateReservationController } from "./controllers/reservations/CreateReservationController";
import { ApproveOrNotReservationController } from "./controllers/reservations/ApproveOrNotReservationController";
import { ConfirmAdoptionController } from "./controllers/reservations/ConfirmAdoptionController";
import { ListNewReservationsController } from "./controllers/reservations/ListNewReservationsController";

const router = Router();

const authenticateUser = new AuthenticateUserController();
const createUserController = new CreateUserController();
const showAuthenticatedUserController = new ShowAuthenticatedUserController();
const editUserController = new EditUserController();
const deleteUserController = new DeleteUserController();
const deleteSpecificUserController = new DeleteSpecificUserController();
const listAllUsersController = new ListAllUsersController();

const createAnimalController = new CreateAnimalController();
const showAnimalController = new ShowAnimalController();
const listAnimalsController = new ListAnimalsController();
const editAnimalController = new EditAnimalController();
const deleteAnimalController = new DeleteAnimalController();
const listAnimalReservationsController = new ListAnimalReservationsController();

const createReservationController = new CreateReservationController();
const approveOrNotReservationController =
  new ApproveOrNotReservationController();
const confirmAdoptionController = new ConfirmAdoptionController();
const listNewReservationsController = new ListNewReservationsController();

router.post("/login", authenticateUser.handle);
router.post("/user", createUserController.handle);
router.get(
  "/user",
  ensureAuthenticated,
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

router.post(
  "/animal",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
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
  "/reservation/resolve/:reservation_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  approveOrNotReservationController.handle
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

export { router };
