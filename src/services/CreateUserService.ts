import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { hash } from "bcryptjs";

import { UsersRepository } from "../repositories/UsersRepository";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phone_number: number;
  address_id: string;
  birth_date: Date;
  admin?: boolean;
  authorizes_image?: boolean;
}

class CreateUserService {
  async execute({
    name,
    email,
    password,
    phone_number,
    address_id,
    birth_date,
    admin = false,
    authorizes_image = false,
  }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (emailAlreadyExists) {
      throw new Error("Email is already in use!");
    }

    const phoneNumberAlreadyExists = await usersRepository.findOne({
      phone_number,
    });

    if (phoneNumberAlreadyExists) {
      throw new Error("Phone number is already in use!");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      phone_number,
      address_id,
      birth_date,
      admin,
      authorizes_image,
    });

    await usersRepository.save(user);

    return classToPlain(user);
  }
}

export { CreateUserService };
