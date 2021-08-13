import { Request, Response } from "express";

import { CreateTaskService } from "../../services/tasks/CreateTaskService";

class CreateTaskController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { animal_id } = req.params;

    const { title, description, expected_at } = req.body;

    const createTaskService = new CreateTaskService();

    const task = createTaskService.execute({
      user_id,
      animal_id,
      title,
      description,
      expected_at,
    });

    return res.json(task);
  }
}

export { CreateTaskController };
