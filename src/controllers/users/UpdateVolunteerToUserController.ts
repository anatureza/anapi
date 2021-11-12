import { Request, Response } from "express";
import { UpdateVolunteerToUserService } from "../../services/users/UpdateVolunteerToUserService";

class UpdateVolunteerToUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;

    const updateUserService = new UpdateVolunteerToUserService();

    const updatedUser = await updateUserService.execute({ userId });

    return res.json(updatedUser);
  }
}

export { UpdateVolunteerToUserController };
