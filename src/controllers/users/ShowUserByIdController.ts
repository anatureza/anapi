import { Request, Response } from "express";
import { ShowAuthenticatedUserService } from "../../services/users/ShowAuthenticatedUserService";

class ShowAuthenticatedUserController {
  async handle(req: Request, res: Response) {
    const showAuthenticatedUserService = new ShowAuthenticatedUserService();

    const { userId } = req.params;

    try {
      if (!userId) {
        const { user_id } = req;
        const user = await showAuthenticatedUserService.execute({
          id: user_id,
        });
        return res.json(user);
      }

      const user = await showAuthenticatedUserService.execute({ id: userId });
      return res.json(user);
    } catch {
      throw new Error("Could not get User Info.");
    }
  }
}

export { ShowAuthenticatedUserController };
