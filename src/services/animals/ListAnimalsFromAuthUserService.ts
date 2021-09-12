import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";

interface IListAnimalRequest {
  volunteer_id: string;
}

class ListAnimalsFromAuthUserService {
  async execute({ volunteer_id }: IListAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animals = await animalsRepository.find({
      where: { volunteer_id },
      relations: ["user", "address", "images"],
    });

    return classToPlain(animals);
  }
}

export { ListAnimalsFromAuthUserService };
