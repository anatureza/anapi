import { getCustomRepository } from "typeorm";
import { AddressesRepository } from "../../repositories/AddressesRepository";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { genderOptions, kindOptions } from "./AnimalOptions";
interface IAnimalRequest {
  volunteer_id: string;
  address_id: string;
  name: string;
  description: string;
  kind: string;
  gender: string;
  birth_date: Date;
}

class CreateAnimalService {
  async execute({
    volunteer_id,
    address_id,
    name,
    description,
    kind,
    gender,
    birth_date,
  }: IAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const addressesRepository = getCustomRepository(AddressesRepository);

    kind = kind.trim().toLowerCase().charAt(0);
    gender = gender.trim().toLowerCase().charAt(0);

    const volunteer = await usersRepository.findOne(volunteer_id);

    if (!volunteer) {
      throw new Error("User does not exist!");
    }

    const addressExists = await addressesRepository.findOne(address_id);

    if (!addressExists) {
      throw new Error("Address Id does not exist!");
    }

    if (kind !== kindOptions[0] && kind !== kindOptions[1]) {
      throw new Error("Kind only be CAT ('c') or DOG ('d')");
    }

    if (gender !== genderOptions[0] && gender !== genderOptions[1]) {
      throw new Error("Gender can only be MALE ('m') or FEMALE ('f')");
    }

    if (birth_date.valueOf() < Date.now().valueOf()) {
      throw new Error("Animal must be born first");
    }

    const animal = animalsRepository.create({
      volunteer_id,
      address_id,
      name,
      description,
      kind,
      gender,
      birth_date,
      available: true,
    });

    await animalsRepository.save(animal);
    return animal;
  }
}

export { CreateAnimalService };
