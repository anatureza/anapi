import { getCustomRepository } from "typeorm";
import { AddressRepository } from "../../repositories/AddressRepository";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IAnimalRequest {
  creator_id: string;
  address_id: string;
  name: string;
  description: string;
  kind: string;
  gender: string;
  birth_date: Date;
}

class CreateAnimalService {
  async execute({
    creator_id,
    address_id,
    name,
    description,
    kind,
    gender,
    birth_date,
  }: IAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const addressRepository = getCustomRepository(AddressRepository);

    // Kind can only be CAT (c) or DOG (d) - at least for now
    const kindOptions: Array<String> = ["c", "d"];
    kind = kind.trim().toLowerCase().charAt(0);

    // Gender can only be MALE (m) or FEMALE (f)
    const genderOptions: Array<String> = ["m", "f"];
    gender = gender.trim().toLowerCase().charAt(0);

    const creatorExists = usersRepository.findOne({
      id: creator_id,
    });

    if (!creatorExists) {
      throw new Error("User does not exist!");
    }

    const addressExists = addressRepository.findOne({
      id: address_id,
    });

    if (!addressExists) {
      throw new Error("Address Id does not exist!");
    }

    if (kind !== kindOptions[0] && kind !== kindOptions[1]) {
      throw new Error("Kind can only be cat or dog");
    }

    if (gender !== genderOptions[0] && gender !== genderOptions[1]) {
      throw new Error("Gender can only be MALE ('m') or FEMALE ('f') ");
    }

    if (birth_date.valueOf() < Date.now().valueOf()) {
      throw new Error("Animal must be born first");
    }

    const animal = animalsRepository.create({
      creator_id,
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
