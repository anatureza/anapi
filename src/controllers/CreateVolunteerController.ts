import { Request, Response } from "express";
import { classToPlain } from "class-transformer";
import { CreateAddressService } from "../services/CreateAddressService";
import { CreateVolunteerService } from "../services/CreateVolunteerService";

class CreateVolunteerAddressController {
  async handle(req: Request, res: Response) {
    const { place, number, complement, neighborhood, zip, city } = req.body;
    const { name, email, password, admin } = req.body;

    const createAddressService = new CreateAddressService();
    const createVolunteerService = new CreateVolunteerService();

    const address = await createAddressService.execute({
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    });

    const volunteer = await createVolunteerService.execute({
      name,
      email,
      password,
      admin,
      address_id: address.id,
    });

    return res.json({ volunteer, address });
  }
}

export { CreateVolunteerAddressController };
