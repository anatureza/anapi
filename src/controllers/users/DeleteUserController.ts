import { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const deleteUserService = new DeleteUserService();

    const message = await deleteUserService.execute({
      user_id,
    });

    return res.json(message);
  }
}

export { DeleteUserController };
