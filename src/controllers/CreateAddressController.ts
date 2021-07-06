import { Request, Response } from "express";
import { CreateAddressService } from "../services/CreateAddressService";

class CreateAddressController {
  async handle(request: Request, response: Response) {
    const { place, number, complement, neighborhood, zip, city } = request.body;

    const createAddressService = new CreateAddressService();

    const address = await createAddressService.execute({
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    });

    return response.json(address);
  }
}

export { CreateAddressController };
