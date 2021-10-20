import path from "path";

import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../../repositories/UsersRepository";
import { UserTokensRepository } from "../../repositories/UserTokensRepository";

import EtherealMail from "../../config/mail/EtherealMail";

interface IRequestResetPassword {
  email: string;
}

class SendForgotPasswordEmailService {
  async execute({ email }: IRequestResetPassword): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error("Email Could Not Be Sent!");
    }

    try {
      const tokenEntity = await userTokensRepository.generate({
        user_id: user.id,
      });
      const token = tokenEntity.token;

      const forgotPasswordTemplate = path.resolve(
        __dirname,
        "..",
        "..",
        "views",
        "forgot_password.hbs"
      );

      await EtherealMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: "Recuperação de senha",
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_EXTERNAL_URL}/reset-password?token=${token}`,
          },
        },
      });
    } catch {
      throw new Error("Email Could Not Be Sent!");
    }
  }
}

export { SendForgotPasswordEmailService };
