import { Request, Response } from "express";
import { DeleteAnimalService } from "../../services/animals/DeleteAnimalService";

class DeleteAnimalController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const animal_id = req.params.id;

    const deleteAnimalService = new DeleteAnimalService();

    const message = await deleteAnimalService.execute({
      id: animal_id,
      volunteer_id: user_id,
    });

    return res.json(message);
  }
}

export { DeleteAnimalController };
