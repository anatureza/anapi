import { Request, Response } from "express";
import { EditAnimalService } from "../../services/animals/EditAnimalService";

class EditAnimalController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { id } = req.params;

    const { name, description, kind, gender, birth_date } = req.body;
    const { place, number, complement, neighborhood, zip, city, uf } = req.body;

    const editAnimalService = new EditAnimalService();

    const updatedAnimal = await editAnimalService.execute(
      {
        id,
        volunteer_id: user_id,
        name,
        description,
        kind,
        gender,
        birth_date,
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
    return res.json(updatedAnimal);
  }
}

export { EditAnimalController };
