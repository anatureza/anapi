import { Request, Response } from "express";

import { EditTaskService } from "../../services/tasks/EditTaskService";

class EditTaskController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { task_id } = req.params;

    const { title, description, expected_at, done } = req.body;

    const editTaskService = new EditTaskService();

    try {
      const task = await editTaskService.execute({
        user_id,
        task_id,
        title,
        description,
        expected_at,
      });

      return res.json(task);
    } catch (err) {
      throw new Error(`Task Could not be edited. ${err}`);
    }
  }
}

export { EditTaskController };
