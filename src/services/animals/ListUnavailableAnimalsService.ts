import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";

interface IListAnimalRequest {
  volunteer_id: string;
}

class ListUnavailableAnimalsService {
  async execute({ volunteer_id }: IListAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animals = await animalsRepository.find({
      where: { volunteer_id, available: false },
      order: { created_at: "ASC" },
      relations: ["user", "address", "images"],
    });

    return classToPlain(animals);
  }
}

export { ListUnavailableAnimalsService };
