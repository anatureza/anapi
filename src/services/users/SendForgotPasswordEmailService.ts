import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../../repositories/UsersRepository";
import { UserTokensRepository } from "../../repositories/UserTokensRepository";

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
      console.log(token);
    } catch {
      throw new Error("Email Could Not Be Sent!");
    }
  }
}

export { SendForgotPasswordEmailService };
