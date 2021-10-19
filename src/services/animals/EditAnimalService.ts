import { getCustomRepository } from "typeorm";
import { isAfter, isSameDay, isValid } from "date-fns";

import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

import { UserType } from "../../entities/User";
import { AnimalGender, AnimalKind } from "../../entities/Animal";

import { EditAddressService } from "../addresses/EditAddressService";

import { checkBirthDate } from "../../utils/verifyDate";

interface IAnimalRequest {
  id: string;
  volunteer_id: string;
  name: string;
  description: string;
  kind?: string;
  gender?: string;
  birth_date: string;
}

interface IAnimalAddressRequest {
  place: string;
  number: string;
  complement: string;
  neighborhood: string;
  zip: string;
  city: string;
  uf?: string;
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
      uf = "NONE",
    }: IAnimalAddressRequest
  ) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const editAddressService = new EditAddressService();

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

    const formatBirthDate = checkBirthDate({ birth_date });

    try {
      await animalsRepository.update(
        { id: animal.id },
        {
          name,
          description,
          kind: enumKind,
          gender: enumGender,
          birth_date: formatBirthDate,
        }
      );

      await editAddressService.execute({
        id: animal.address_id,
        place,
        number,
        complement,
        neighborhood,
        zip,
        city,
        uf,
      });

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
