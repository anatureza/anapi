import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { hash } from "bcryptjs";

import { UsersRepository } from "../../repositories/UsersRepository";
import { AddressesRepository } from "../../repositories/AddressesRepository";
import { UserType } from "../../entities/User";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  birth_date: Date;
  type?: string;
  authorizes_image?: boolean;
}

interface IUserAddressRequest {
  place: string;
  number: number;
  complement: string;
  neighborhood: string;
  zip: number;
  city: string;
}

class CreateUserService {
  async execute(
    {
      name,
      email,
      password,
      phone_number,
      birth_date,
      type = "user",
      authorizes_image = false,
    }: IUserRequest,
    { place, number, complement, neighborhood, zip, city }: IUserAddressRequest
  ) {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressRepository = getCustomRepository(AddressesRepository);

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

    type = type.trim().toLowerCase();
    const enumType =
      type === "admin"
        ? UserType.ADMIN
        : type === "volunteer"
        ? UserType.VOLUNTEER
        : UserType.USER;

    const userAddress = addressRepository.create({
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    });
    await addressRepository.save(userAddress);

    try {
      const user = usersRepository.create({
        name,
        email,
        address_id: userAddress.id,
        password: passwordHash,
        phone_number,
        birth_date,
        type: enumType,
        authorizes_image,
      });

      await usersRepository.save(user);
      return classToPlain([user, userAddress]);
    } catch (error) {
      await addressRepository.delete({ id: userAddress.id });
      throw new Error(`User Could Not Be Created why?(${error})`);
    }
  }
}

export { CreateUserService };
