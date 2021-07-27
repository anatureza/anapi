import { Request, Response } from "express";
import { CreateAddressService } from "../../services/addresses/CreateAddressService";
import { CreateUserService } from "../../services/users/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    // Get Address info
    const { place, number, complement, neighborhood, zip, city } = req.body;
    // Get User info
    const {
      name,
      email,
      password,
      phone_number,
      birth_date,
      admin,
      authorizes_image,
    } = req.body;

    const createAddressService = new CreateAddressService();
    const createUserService = new CreateUserService();

    const address = await createAddressService.execute({
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    });

    const user = await createUserService.execute({
      name,
      email,
      password,
      phone_number,
      address_id: address.id,
      birth_date,
      admin,
      authorizes_image,
    });

    return res.json({ user, address });
  }
}

export { CreateUserController };
