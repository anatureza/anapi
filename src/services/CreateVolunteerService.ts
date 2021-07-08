import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { VolunteersRepository } from "../repositories/VolunteersRepository";

interface IVolunteerRequest {
  name: string;
  email: string;
  phone_number: number;
  password: string;
  admin?: boolean;
  address_id: string;
}

class CreateVolunteerService {
  async execute({
    name,
    email,
    phone_number,
    password,
    admin = false,
    address_id,
  }: IVolunteerRequest) {
    const volunteersRepository = getCustomRepository(VolunteersRepository);

    const emailAlreadyExists = volunteersRepository.findOne({
      email,
    });

    if (emailAlreadyExists) {
      throw new Error("Email is already in use!");
    }

    const phoneNumberAlreadyExists = volunteersRepository.findOne({
      phone_number,
    });

    if (phoneNumberAlreadyExists) {
      throw new Error("Phone number is already in use!");
    }

    const volunteer = volunteersRepository.create({
      name,
      email,
      phone_number,
      password,
      admin,
      address_id,
    });

    await volunteersRepository.save(volunteer);

    return classToPlain(volunteer);
  }
}

export { CreateVolunteerService };
