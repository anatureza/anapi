import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";

class ListAnimalsService {
  async execute() {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animals = await animalsRepository.find({
      order: { created_at: "ASC" },
      relations: ["user", "address", "images"],
    });

    if (!animals || animals.length === 0) {
      return [];
    }

    return classToPlain(animals);
  }
}

export { ListAnimalsService };
