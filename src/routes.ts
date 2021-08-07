import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";

import { CreateUserController } from "./controllers/users/CreateUserController";
import { ShowAuthenticatedUserController } from "./controllers/users/ShowUserByIdController";
import { EditUserController } from "./controllers/users/EditUserController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { ListAllUsersController } from "./controllers/users/ListAllUsersController";

import { AuthenticateUserController } from "./controllers/auth/AuthenticateUserController";

import { CreateAnimalController } from "./controllers/animals/CreateAnimalController";
import { ListAnimalsController } from "./controllers/animals/ListAnimalsController";
import { EditAnimalController } from "./controllers/animals/EditAnimalController";
import { DeleteAnimalController } from "./controllers/animals/DeleteAnimalController";

import { CreateQuestionController } from "./controllers/questions/CreateQuestionController";
import { ListQuestionsController } from "./controllers/questions/ListQuestionController";
import { EditQuestionFromOrderController } from "./controllers/questions/EditQuestionFromOrderController";
import { DeleteQuestionFromIdController } from "./controllers/questions/DeleteQuestionFromIdController";
import { DeleteSpecificUserController } from "./controllers/users/DeleteSpecificUserController";

const router = Router();

const authenticateUser = new AuthenticateUserController();
const createUserController = new CreateUserController();
const showAuthenticatedUserController = new ShowAuthenticatedUserController();
const editUserController = new EditUserController();
const deleteUserController = new DeleteUserController();
const deleteSpecificUserController = new DeleteSpecificUserController();
const listAllUsersController = new ListAllUsersController();

const createAnimalController = new CreateAnimalController();
const listAnimalController = new ListAnimalsController();
const editAnimalController = new EditAnimalController();
const deleteAnimalController = new DeleteAnimalController();

const createQuestionController = new CreateQuestionController();
const listQuestionsController = new ListQuestionsController();
const editQuestionsController = new EditQuestionFromOrderController();
const deleteQuestionFromIdController = new DeleteQuestionFromIdController();

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
  ensureAdmin,
  listAllUsersController.handle
);

router.post(
  "/animal",
  ensureAuthenticated,
  ensureAdmin,
  createAnimalController.handle
);
router.get(
  "/animals",
  ensureAuthenticated,
  ensureAdmin,
  listAnimalController.handle
);
router.put(
  "/animal/:id",
  ensureAuthenticated,
  ensureAdmin,
  editAnimalController.handle
);
router.delete(
  "/animal/:id",
  ensureAuthenticated,
  ensureAdmin,
  deleteAnimalController.handle
);

router.post(
  "/question",
  ensureAuthenticated,
  ensureAdmin,
  createQuestionController.handle
);
router.get("/questions", listQuestionsController.handle);
router.put(
  "/question",
  ensureAuthenticated,
  ensureAdmin,
  editQuestionsController.handle
);
router.delete(
  "/question",
  ensureAuthenticated,
  ensureAdmin,
  deleteQuestionFromIdController.handle
);

export { router };
