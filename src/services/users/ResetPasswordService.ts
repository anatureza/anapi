import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { addHours, isAfter } from "date-fns";

import { UsersRepository } from "../../repositories/UsersRepository";
import { UserTokensRepository } from "../../repositories/UserTokensRepository";

interface IResetPassword {
  token: string;
  password: string;
}

class ResetPasswordService {
  async execute({ token, password }: IResetPassword) {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findOne({ token });

    if (!userToken) {
      throw new Error("Token Does Not Exist!");
    }

    const user = await usersRepository.findOne({ id: userToken.user_id });

    if (!user) {
      throw new Error("User Does Not Exist!");
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new Error("Token expired!");
    }

    const passwordHash = await hash(password, 8);

    user.password = passwordHash;

    usersRepository.save(user);
  }
}

export { ResetPasswordService };
