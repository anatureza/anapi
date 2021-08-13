import { Request, Response } from "express";

import { DeleteTaskService } from "../../services/tasks/DeleteTaskService";

class DeleteTaskController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { task_id } = req.params;

    const deleteTaskService = new DeleteTaskService();

    const message = deleteTaskService.execute({ task_id, user_id });

    return res.json(message);
  }
}

export { DeleteTaskController };
