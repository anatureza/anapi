import { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const user_id_params = req.params.id;

    const deleteUserService = new DeleteUserService();

    const message = await deleteUserService.execute({
      user_id,
      user_id_params,
    });

    return res.json(message);
  }
}

export { DeleteUserController };
