import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { hash } from "bcryptjs";

import { UsersRepository } from "../../repositories/UsersRepository";
import { UserType } from "../../entities/User";

import moment from "moment";

import { CreateAddressService } from "../addresses/CreateAddressService";
import { DeleteAddressService } from "../addresses/DeleteAddressService";

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
  number: string;
  complement: string;
  neighborhood: string;
  zip: string;
  city: string;
  uf?: string;
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
    {
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
      uf = "NONE",
    }: IUserAddressRequest
  ) {
    const usersRepository = getCustomRepository(UsersRepository);

    const createAddressService = new CreateAddressService();
    const deleteAddressService = new DeleteAddressService();

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

    type = type.trim().toUpperCase();
    const enumType = UserType[type];

    const formatBirthDate = moment(birth_date, "YYYY-MM-DD");

    if (!formatBirthDate.isValid()) {
      throw new Error("Invalid Data Input");
    }

    if (formatBirthDate.isSameOrAfter(moment())) {
      throw new Error("Invalid Date");
    }

    const passwordHash = await hash(password, 8);

    const address = await createAddressService.execute({
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
      uf,
    });

    try {
      const user = usersRepository.create({
        name,
        email,
        address_id: address.id,
        password: passwordHash,
        phone_number,
        birth_date: formatBirthDate.toDate(),
        type: enumType,
        authorizes_image,
      });

      await usersRepository.save(user);
      return classToPlain([user, address]);
    } catch (error) {
      await deleteAddressService.execute({ id: address.id });
      throw new Error(`User Could Not Be Created (${error})`);
    }
  }
}

export { CreateUserService };
