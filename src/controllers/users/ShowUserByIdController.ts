import { Request, Response } from "express";
import { ShowAuthenticatedUserService } from "../../services/users/ShowAuthenticatedUserService";

class ShowAuthenticatedUserController {
  async handle(req: Request, res: Response) {
    const showAuthenticatedUserService = new ShowAuthenticatedUserService();

    const { user_id } = req;

    const user = await showAuthenticatedUserService.execute({ id: user_id });

    return res.json(user);
  }
}

export { ShowAuthenticatedUserController };
