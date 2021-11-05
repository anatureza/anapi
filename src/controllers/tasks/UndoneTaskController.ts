import { Request, Response } from "express";
import { DoneOrUndoneTaskService } from "../../services/tasks/DoneOrUndoneTaskService";

class UndoneTaskController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { task_id } = req.params;

    const undoneTaskService = new DoneOrUndoneTaskService();

    try {
      const updatedTask = await undoneTaskService.execute({
        done: false,
        task_id,
        user_id,
      });
      return res.json(updatedTask);
    } catch {
      throw new Error("Task Could not be marked as Done.");
    }
  }
}

export { UndoneTaskController };
