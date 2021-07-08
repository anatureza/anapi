import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

import { VolunteersRepository } from "../repositories/VolunteersRepository";

config();

interface IAuthenticateVolunteer {
  email: string;
  password: string;
}

class AuthenticateVolunteerService {
  async execute({ email, password }: IAuthenticateVolunteer) {
    const volunteersRepository = getCustomRepository(VolunteersRepository);

    const volunteer = await volunteersRepository.findOne({
      email,
    });

    if (!volunteer) {
      throw new Error("Email does not exists!");
    }

    const passwordMatch = compare(password, volunteer.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const token = sign(
      {
        email: volunteer.email,
      },
      process.env.HASH_CODE,
      {
        subject: volunteer.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateVolunteerService };
