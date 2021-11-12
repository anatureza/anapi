import { Request, Response } from "express";
import { AuthenticateUserService } from "../../services/users/AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { token, userType, userId, userAvatarUrl } =
      await authenticateUserService.execute({
        email,
        password,
      });

    return res.json({ token, userType, userId, userAvatarUrl });
  }
}

export { AuthenticateUserController };
