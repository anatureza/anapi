import { Request, Response } from "express";

import { CreateAddressService } from "../../services/addresses/CreateAddressService";
import { CreateAnimalService } from "../../services/animals/CreateAnimalService";

class CreateAnimalController {
  async handle(req: Request, res: Response) {
    const { place, number, complement, neighborhood, zip, city, uf } = req.body;

    const { name, description, kind, gender, birth_date } = req.body;

    const { user_id } = req;

    const requestImages = req.files
      ? (req.files as Express.Multer.File[])
      : null;

    const createAddressService = new CreateAddressService();
    const createAnimalService = new CreateAnimalService();

    const address = await createAddressService.execute({
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
      uf,
    });

    const animal = await createAnimalService.execute({
      volunteer_id: user_id,
      address_id: address.id,
      name,
      description,
      kind,
      gender,
      birth_date,
      requestImages,
    });

    return res.json({ animal, address });
  }
}

export { CreateAnimalController };
