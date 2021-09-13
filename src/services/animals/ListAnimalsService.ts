import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";

class ListAnimalsService {
  async execute() {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animals = await animalsRepository.find({
      relations: ["user", "address", "images"],
    });

    return classToPlain(animals);
  }
}

export { ListAnimalsService };
