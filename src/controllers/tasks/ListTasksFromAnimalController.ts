import { Request, Response } from "express";

import { ListTasksFromAnimalService } from "../../services/tasks/ListTasksFromAnimalService";

class ListTasksFromAnimalController {
  async handle(req: Request, res: Response) {
    const { animal_id } = req.params;

    const listTasksFromAnimalService = new ListTasksFromAnimalService();

    const tasks = listTasksFromAnimalService.execute({ animal_id });

    return res.json(tasks);
  }
}

export { ListTasksFromAnimalController };
