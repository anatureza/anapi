import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateAnimalController } from "./controllers/CreateAnimalController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUser = new AuthenticateUserController();
const createAnimalController = new CreateAnimalController();

router.post("/login", authenticateUser.handle);
router.post("/user", createUserController.handle);

router.post(
  "/animal/new",
  ensureAuthenticated,
  ensureAdmin,
  createAnimalController.handle
);

export { router };
