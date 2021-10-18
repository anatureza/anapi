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
      const token = await userTokensRepository.generate({ user_id: user.id });

      await EtherealMail.sendMail({
        to: email,
        body: `Solicitação de redefinição de senha recebida, token: ${token.token}`,
      });
    } catch {
      throw new Error("Email Could Not Be Sent!");
    }
  }
}

export { SendForgotPasswordEmailService };
