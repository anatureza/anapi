import { Request, Response } from "express";

import { EditTaskService } from "../../services/tasks/EditTaskService";

class EditTaskController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { task_id } = req.params;

    const { title, description, expected_at, done } = req.body;

    const editTaskService = new EditTaskService();

    const task = editTaskService.execute({
      user_id,
      task_id,
      title,
      description,
      expected_at,
      done,
    });

    return res.json(task);
  }
}

export { EditTaskController };
