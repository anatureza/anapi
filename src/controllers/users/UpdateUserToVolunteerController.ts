import { Request, Response } from "express";

import { UpdateUserToVolunteerService } from "../../services/users/UpdateUserToVolunteerService";

class UpdateUserToVolunteerController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;

    const updateUserService = new UpdateUserToVolunteerService();

    const updatedUser = await updateUserService.execute({ userId });

    return res.json(updatedUser);
  }
}

export { UpdateUserToVolunteerController };
