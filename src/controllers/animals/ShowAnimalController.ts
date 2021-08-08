import { Request, Response } from "express";
import { ShowAnimalService } from "../../services/animals/ShowAnimalService";

class ShowAnimalController {
  async handle(req: Request, res: Response) {
    const showAnimalService = new ShowAnimalService();

    const { id } = req.params;

    const animal = showAnimalService.execute({ id });

    return animal;
  }
}

export { ShowAnimalController };
