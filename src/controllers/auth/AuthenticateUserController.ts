import { Request, Response } from "express";
import { AuthenticateUserService } from "../../services/auth/AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { token, userType } = await authenticateUserService.execute({
      email,
      password,
    });

    return res.json({ token, userType });
  }
}

export { AuthenticateUserController };
