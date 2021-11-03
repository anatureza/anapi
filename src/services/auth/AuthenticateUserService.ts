import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

import { UsersRepository } from "../../repositories/UsersRepository";

config();

interface IAuthenticateUser {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const token = sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, userType: user.type, userId: user.id };
  }
}

export { AuthenticateUserService };
