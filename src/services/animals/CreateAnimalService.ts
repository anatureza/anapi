import { getCustomRepository } from "typeorm";

import { AnimalGender, AnimalKind } from "../../entities/Animal";

import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

import moment from "moment";

import { CreateAddressService } from "../addresses/CreateAddressService";
import { DeleteAddressService } from "../addresses/DeleteAddressService";

interface IAnimalRequest {
  volunteer_id: string;
  name: string;
  description: string;
  kind?: string;
  gender?: string;
  birth_date: Date;
  requestImages?: Express.Multer.File[];
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

class CreateAnimalService {
  async execute(
    {
      volunteer_id,
      name,
      description,
      kind,
      gender,
      birth_date,
      requestImages,
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

    const createAddressService = new CreateAddressService();
    const deleteAddressService = new DeleteAddressService();

    const volunteer = await usersRepository.findOne(volunteer_id);

    if (!volunteer) {
      throw new Error("User does not exist!");
    }

    kind = kind.trim().toUpperCase();
    const enumKind = AnimalKind[kind];

    gender = gender.trim().toUpperCase();
    const enumGender = AnimalGender[gender];

    const formatBirthDate = moment(birth_date, "YYYY-MM-DD");

    if (!formatBirthDate.isValid()) {
      throw new Error("Invalid Data Input");
    }

    if (formatBirthDate.isSameOrAfter(moment())) {
      throw new Error("Invalid Date");
    }

    const images = requestImages
      ? requestImages.map((image) => {
          return { path: image.filename };
        })
      : null;

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
      const animal = animalsRepository.create({
        volunteer_id,
        address_id: address.id,
        name,
        description,
        kind: enumKind,
        gender: enumGender,
        birth_date: formatBirthDate.toDate(),
        available: true,
        images,
      });

      await animalsRepository.save(animal);

      return animal;
    } catch (error) {
      await deleteAddressService.execute({ id: address.id });
      throw new Error(`Animal Could Not Be Created! (${error})`);
    }
  }
}

export { CreateAnimalService };
