import { Request, Response } from "express";

import { UpdateUserAvatarService } from "../../services/users/UpdateUserAvatarService";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const requestAvatar = req.file;

    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = updateUserAvatarService.execute({ user_id, requestAvatar });

    return res.json(user);
  }
}

export { UpdateUserAvatarController };
