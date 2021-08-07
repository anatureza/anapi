import { getCustomRepository } from "typeorm";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";

class ListAnimalsService {
  async execute() {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animals = await animalsRepository.find();

    return animals;
  }
}

export { ListAnimalsService };
