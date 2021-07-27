import { Request, Response } from "express";

import { CreateAddressService } from "../../services/addresses/CreateAddressService";
import { CreateAnimalService } from "../../services/animals/CreateAnimalService";

class CreateAnimalController {
  async handle(req: Request, res: Response) {
    const { place, number, complement, neighborhood, zip, city } = req.body;

    const { name, description, kind, gender, birth_date } = req.body;

    const user_id = req.user_id;

    const createAddressService = new CreateAddressService();
    const createAnimalService = new CreateAnimalService();

    const address = await createAddressService.execute({
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    });

    const animal = await createAnimalService.execute({
      creator_id: user_id,
      address_id: address.id,
      name,
      description,
      kind,
      gender,
      birth_date,
    });

    return res.json({ animal, address });
  }
}

export { CreateAnimalController };
