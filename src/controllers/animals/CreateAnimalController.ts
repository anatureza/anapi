import { Request, Response } from "express";

import { CreateAnimalService } from "../../services/animals/CreateAnimalService";

class CreateAnimalController {
  async handle(req: Request, res: Response) {
    const { place, number, complement, neighborhood, zip, city, uf } = req.body;

    const { name, description, kind, gender, birth_date } = req.body;

    const { user_id } = req;

    const requestImages = req.files
      ? (req.files as Express.Multer.File[])
      : null;

    const createAnimalService = new CreateAnimalService();

    const animal = await createAnimalService.execute(
      {
        volunteer_id: user_id,
        name,
        description,
        kind,
        gender,
        birth_date,
        requestImages,
      },
      {
        place,
        number,
        complement,
        neighborhood,
        zip,
        city,
        uf,
      }
    );

    return res.json(animal);
  }
}

export { CreateAnimalController };
