import { Request, Response } from "express";
import { DoneOrUndoneTaskService } from "../../services/tasks/DoneOrUndoneTaskService";

class DoneTaskController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { task_id } = req.params;

    const doneTaskService = new DoneOrUndoneTaskService();

    try {
      const updatedTask = await doneTaskService.execute({
        done: true,
        task_id,
        user_id,
      });
      return res.json(updatedTask);
    } catch {
      throw new Error("Task Could not be marked as Done.");
    }
  }
}

export { DoneTaskController };
