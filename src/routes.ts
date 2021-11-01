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

import { SendForgotPasswordEmailController } from "./controllers/users/SendForgotPasswordEmailController";
import { ResetPasswordController } from "./controllers/users/ResetPasswordController";

import { CreateAnimalController } from "./controllers/animals/CreateAnimalController";
import { ShowAnimalController } from "./controllers/animals/ShowAnimalController";
import { ListAnimalsController } from "./controllers/animals/ListAnimalsController";
import { ListAnimalsFromAuthUserController } from "./controllers/animals/ListAnimalsFromAuthUserController";
import { ListAvailableAnimalsController } from "./controllers/animals/ListAvailableAnimalsController";
import { ListUnavailableAnimalsController } from "./controllers/animals/ListUnavailableAnimalsController";
import { EditAnimalController } from "./controllers/animals/EditAnimalController";
import { DeleteAnimalController } from "./controllers/animals/DeleteAnimalController";
import { ListAnimalReservationsController } from "./controllers/animals/ListAnimalReservationsController";

import { DeleteAnimalImageController } from "./controllers/animals/DeleteAnimalImageController";

import { CreateReservationController } from "./controllers/reservations/CreateReservationController";
import { ApproveReservationController } from "./controllers/reservations/ApproveReservationController";
import { DisapproveReservationController } from "./controllers/reservations/DisapproveReservationController";
import { ConfirmAdoptionController } from "./controllers/reservations/ConfirmAdoptionController";
import { ListNewReservationsController } from "./controllers/reservations/ListNewReservationsController";
import { ListApprovedReservationsController } from "./controllers/reservations/ListApprovedReservationsController";
import { ListDisapprovedReservationsController } from "./controllers/reservations/ListDisapprovedReservationsController";
import { ShowReservationController } from "./controllers/reservations/ShowReservationController";

import { CreateTaskController } from "./controllers/tasks/CreateTaskController";
import { ListTasksFromAnimalController } from "./controllers/tasks/ListTasksFromAnimalController";
import { EditTaskController } from "./controllers/tasks/EditTaskController";
import { DeleteTaskController } from "./controllers/tasks/DeleteTaskController";
import { UploadAnimalImagesController } from "./controllers/animals/UploadAnimalImagesController";

const router = Router();

router.post("/login", new AuthenticateUserController().handle);
router.post("/user", new CreateUserController().handle);
router.get(
  "/user",
  ensureAuthenticated,
  new ShowAuthenticatedUserController().handle
);
router.get(
  "/user/:userId",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ShowAuthenticatedUserController().handle
);
router.put("/user", ensureAuthenticated, new EditUserController().handle);
router.delete("/user", ensureAuthenticated, new DeleteUserController().handle);
router.delete(
  "/user/:id",
  ensureAuthenticated,
  ensureAdmin,
  new DeleteSpecificUserController().handle
);
router.get(
  "/users",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ListAllUsersController().handle
);
router.patch(
  "/user/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  new UpdateUserAvatarController().handle
);
router.post(
  "/user/password/forgot",
  new SendForgotPasswordEmailController().handle
);
router.post("/user/password/reset", new ResetPasswordController().handle);

router.post(
  "/animal",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  upload.array("images"),
  new CreateAnimalController().handle
);
router.get("/animal/:id", new ShowAnimalController().handle);
router.get(
  "/animals",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ListAnimalsFromAuthUserController().handle
);
router.get(
  "/animals/available",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ListAvailableAnimalsController().handle
);
router.get(
  "/animals/unavailable",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ListUnavailableAnimalsController().handle
);
router.get("/all-animals", new ListAnimalsController().handle);
router.put(
  "/animal/:id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new EditAnimalController().handle
);
router.delete(
  "/animal/:id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new DeleteAnimalController().handle
);
router.get(
  "/animal/reservations/:animal_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ListAnimalReservationsController().handle
);
router.patch(
  "/animal/:animal_id/image",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  upload.array("images"),
  new UploadAnimalImagesController().handle
);
router.delete(
  "/animal/:animal_id/image/:image_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new DeleteAnimalImageController().handle
);

router.post(
  "/reservation/:animal_id",
  ensureAuthenticated,
  new CreateReservationController().handle
);
router.get(
  "/reservation/:reservation_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ShowReservationController().handle
);
router.post(
  "/reservation/approve/:reservation_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ApproveReservationController().handle
);
router.post(
  "/reservation/disapprove/:reservation_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new DisapproveReservationController().handle
);
router.post(
  "/reservation/adopt/:reservation_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ConfirmAdoptionController().handle
);
router.get(
  "/reservations/new",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ListNewReservationsController().handle
);
router.get(
  "/reservations/approved",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ListApprovedReservationsController().handle
);
router.get(
  "/reservations/disapproved",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ListDisapprovedReservationsController().handle
);

router.post(
  "/task/:animal_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new CreateTaskController().handle
);
router.get(
  "/tasks/:animal_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new ListTasksFromAnimalController().handle
);
router.put(
  "/task/:task_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new EditTaskController().handle
);
router.delete(
  "/task/:task_id",
  ensureAuthenticated,
  ensureAtLeastVolunteer,
  new DeleteTaskController().handle
);

export { router };
