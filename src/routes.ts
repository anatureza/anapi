import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUser = new AuthenticateUserController();

router.post("/login", authenticateUser.handle);
router.post("/user", createUserController.handle);

export { router };
