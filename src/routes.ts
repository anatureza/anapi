import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";

import { CreateVolunteerAddressController } from "./controllers/CreateVolunteerController";
import { AuthenticateVolunteerController } from "./controllers/AuthenticateVolunteerController";

const router = Router();

const createVolunteerAddressController = new CreateVolunteerAddressController();
const authenticateVolunteer = new AuthenticateVolunteerController();

router.post("/login", authenticateVolunteer.handle);
router.post(
  "/volunteer",
  ensureAuthenticated,
  ensureAdmin,
  createVolunteerAddressController.handle
);

export { router };
