import { Request, Response } from "express";
import { SendForgotPasswordEmailService } from "../../services/users/SendForgotPasswordEmailService";

class SendForgotPasswordEmailController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmailService.execute({ email });

    return res.status(204).json();
  }
}

export { SendForgotPasswordEmailController };
