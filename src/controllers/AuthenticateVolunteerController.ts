import { Request, Response } from "express";
import { AuthenticateVolunteerService } from "../services/AuthenticateVolunteerService";

class AuthenticateVolunteerController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateVolunteerService = new AuthenticateVolunteerService();

    const token = await authenticateVolunteerService.execute({
      email,
      password,
    });

    return res.json(token);
  }
}

export { AuthenticateVolunteerController };
