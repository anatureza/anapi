import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../../repositories/UsersRepository";
import { UserTokensRepository } from "../../repositories/UserTokensRepository";

import moment from "moment";
import { hash } from "bcryptjs";

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

    const tokenCreatedAt = moment(userToken.created_at);

    const compareDate = tokenCreatedAt.add("2", "h");

    if (compareDate.isAfter(moment())) {
      throw new Error("Token Expired!");
    }

    const passwordHash = await hash(password, 8);

    user.password = passwordHash;

    usersRepository.save(user);
  }
}

export { ResetPasswordService };
