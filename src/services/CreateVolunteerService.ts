import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { VolunteersRepository } from "../repositories/VolunteersRepository";

interface IVolunteerRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
  address_id: string;
}

class CreateVolunteerService {
  async execute({
    name,
    email,
    password,
    admin = false,
    address_id,
  }: IVolunteerRequest) {
    const volunteersRepository = getCustomRepository(VolunteersRepository);

    const addressIdAlreadyInUse = await volunteersRepository.findOne({
      address_id,
    });

    if (addressIdAlreadyInUse) {
      throw new Error("Address is already in use!");
    }
    const volunteer = volunteersRepository.create({
      name,
      email,
      password,
      admin,
      address_id,
    });

    await volunteersRepository.save(volunteer);

    return classToPlain(volunteer);
  }
}

export { CreateVolunteerService };
