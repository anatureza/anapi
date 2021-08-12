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

    kind = kind.trim().toUpperCase();
    const enumKind = AnimalKind[kind];

    gender = gender.trim().toUpperCase();
    const enumGender = AnimalGender[gender];

    const birthDate = new Date(birth_date);
    const now = new Date(Date.now());

    if (birthDate.getTime() > now.getTime()) {
      throw new Error("Invalid Date");
    }

    try {
      await animalsRepository.update(
        { id: animal.id },
        {
          name,
          description,
          kind: enumKind,
          gender: enumGender,
          birth_date: birthDate,
        }
      );
      await addressesRepository.update(
        { id: animal.address_id },
        {
          place,
          number,
          complement,
          neighborhood,
          zip,
          city,
        }
      );

      const updatedAnimal = await animalsRepository.findOne(
        { id: animal.id },
        {
          relations: ["address"],
        }
      );

      return updatedAnimal;
    } catch (error) {
      throw new Error(`Animal Could Not be Edited (${error})`);
    }
  }
}
export { EditAnimalService };
