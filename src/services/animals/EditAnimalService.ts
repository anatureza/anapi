import { getCustomRepository } from "typeorm";

import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { AddressesRepository } from "../../repositories/AddressesRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

import { genderOptions, kindOptions } from "./AnimalOptions";
import { UserType } from "../../entities/User";

interface IAnimalRequest {
  id: string;
  volunteer_id: string;
  name: string;
  description: string;
  kind: string;
  gender: string;
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
      kind,
      gender,
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

    const animal = await animalsRepository.findOne({ id });

    if (!animal) {
      throw new Error("Animal Does Not Exist!");
    }

    const user = await usersRepository.findOne(volunteer_id);

    if (user.type !== UserType.ADMIN) {
      if (animal.volunteer_id !== volunteer_id) {
        throw new Error("You Can't Edit this Animal");
      }
    }

    if (typeof kind !== "undefined") {
      kind = kind.trim().toLowerCase().charAt(0);

      if (kind !== kindOptions[0] && kind !== kindOptions[1]) {
        throw new Error("Kind only be CAT ('c') or DOG ('d')");
      }
    }

    if (typeof gender !== "undefined") {
      gender = gender.trim().toLowerCase().charAt(0);

      if (gender !== genderOptions[0] && gender !== genderOptions[1]) {
        throw new Error("Gender can only be MALE ('m') or FEMALE ('f')");
      }
    }

    try {
      const address = await addressesRepository.findOneOrFail({
        id: animal.address_id,
      });

      const updatedAnimalData = Object.assign(animal, {
        name,
        description,
        kind,
        gender,
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
      console.log(error);
      throw new Error("Animal Could Not be Edited");
    }
  }
}
export { EditAnimalService };
