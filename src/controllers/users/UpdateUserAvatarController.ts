import { Request, Response } from "express";

import { UpdateUserAvatarService } from "../../services/users/UpdateUserAvatarService";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const avatarFilename = req.file.filename;

    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = updateUserAvatarService.execute({ user_id, avatarFilename });

    return res.json(user);
  }
}

export { UpdateUserAvatarController };
