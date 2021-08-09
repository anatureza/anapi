import { getCustomRepository } from "typeorm";
import { AnimalGender, AnimalKind } from "../../entities/Animal";
import { AddressesRepository } from "../../repositories/AddressesRepository";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
interface IAnimalRequest {
  volunteer_id: string;
  address_id: string;
  name: string;
  description: string;
  kind?: string;
  gender?: string;
  birth_date: Date;
}

class CreateAnimalService {
  async execute({
    volunteer_id,
    address_id,
    name,
    description,
    kind = "none",
    gender = "none",
    birth_date,
  }: IAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const addressesRepository = getCustomRepository(AddressesRepository);

    const volunteer = await usersRepository.findOne(volunteer_id);

    if (!volunteer) {
      throw new Error("User does not exist!");
    }

    const addressExists = await addressesRepository.findOne(address_id);

    if (!addressExists) {
      throw new Error("Address Id does not exist!");
    }

    kind = kind.trim().toLowerCase();
    const enumKind =
      kind === "dog"
        ? AnimalKind.DOG
        : kind === "cat"
        ? AnimalKind.CAT
        : AnimalKind.NONE;

    gender = gender.trim().toLowerCase();
    const enumGender =
      gender === "female"
        ? AnimalGender.FEMALE
        : gender === "male"
        ? AnimalGender.MALE
        : AnimalGender.NONE;

    if (birth_date.valueOf() < Date.now().valueOf()) {
      throw new Error("Animal must be born first");
    }

    const animal = animalsRepository.create({
      volunteer_id,
      address_id,
      name,
      description,
      kind: enumKind,
      gender: enumGender,
      birth_date,
      available: true,
    });

    await animalsRepository.save(animal);
    return animal;
  }
}

export { CreateAnimalService };
