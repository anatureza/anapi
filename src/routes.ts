import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateAnimalController } from "./controllers/CreateAnimalController";
import { CreateQuestionController } from "./controllers/questions/CreateQuestionController";
import { ListQuestionsController } from "./controllers/questions/ListQuestionController";
import { EditQuestionFromOrderController } from "./controllers/questions/EditQuestionFromOrderController";
import { DeleteQuestionFromIdController } from "./controllers/questions/DeleteQuestionFromIdController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUser = new AuthenticateUserController();

const createAnimalController = new CreateAnimalController();

const createQuestionController = new CreateQuestionController();
const listQuestionsController = new ListQuestionsController();
const editQuestionsController = new EditQuestionFromOrderController();
const deleteQuestionFromIdController = new DeleteQuestionFromIdController();

router.post("/login", authenticateUser.handle);
router.post("/user", createUserController.handle);

router.post(
  "/animal/new",
  ensureAuthenticated,
  ensureAdmin,
  createAnimalController.handle
);

router.post(
  "/question",
  ensureAuthenticated,
  ensureAdmin,
  createQuestionController.handle
);
router.get("/questions", listQuestionsController.handle);
router.patch(
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
