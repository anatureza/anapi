import { Router } from "express";
import { CreateAddressController } from "./controllers/CreateAddressController";

const router = Router();

const createAddressController = new CreateAddressController();

router.post("/address", createAddressController.handle);

export { router };
