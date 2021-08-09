import { getCustomRepository } from "typeorm";

import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { AddressesRepository } from "../../repositories/AddressesRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

import { UserType } from "../../entities/User";
import { AnimalGender, AnimalKind } from "../../entities/Animal";

interface IAnimalRequest {
  id: string;
  volunteer_id: string;
  name: string;
  description: string;
  kind?: string;
  gender?: string;
  birth_date: Date;
}

interface IAnimalAddressRequest {
  place: string;
  number: number;
  complement: string;
  neighborhood: string;
  zip: number;
  city: string;
}

class EditAnimalService {
  async execute(
    {
      id,
      volunteer_id,
      name,
      description,
      kind = "none",
      gender = "none",
      birth_date,
    }: IAnimalRequest,
    {
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    }: IAnimalAddressRequest
  ) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const addressesRepository = getCustomRepository(AddressesRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const animal = await animalsRepository.findOne(id);

    if (!animal) {
      throw new Error("Animal Does Not Exist!");
    }

    const user = await usersRepository.findOne(volunteer_id);

    if (user.type !== UserType.ADMIN) {
      if (animal.volunteer_id !== volunteer_id) {
        throw new Error("You Can't Edit this Animal");
      }
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

    try {
      const address = await addressesRepository.findOneOrFail({
        id: animal.address_id,
      });

      const updatedAnimalData = Object.assign(animal, {
        name,
        description,
        kind: enumKind,
        gender: enumGender,
        birth_date,
      });

      const updatedAddressData = Object.assign(address, {
        place,
        number,
        complement,
        neighborhood,
        zip,
        city,
      });

      const updatedAnimal = await animalsRepository.save(updatedAnimalData);
      const updatedAddress = await addressesRepository.save(updatedAddressData);

      return { updatedAnimal, updatedAddress };
    } catch (error) {
      throw new Error(`Animal Could Not be Edited (${error})`);
    }
  }
}
export { EditAnimalService };
