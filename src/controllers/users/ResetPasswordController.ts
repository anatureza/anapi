import { Request, Response } from "express";
import { ResetPasswordService } from "../../services/users/ResetPasswordService";

class ResetPasswordController {
  async handle(req: Request, res: Response) {
    const { token, password } = req.body;

    const resetPasswordService = new ResetPasswordService();

    await resetPasswordService.execute({ token, password });

    return res.status(204).json();
  }
}

export { ResetPasswordController };
