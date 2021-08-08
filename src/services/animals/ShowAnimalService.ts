import { getCustomRepository } from "typeorm";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";

interface IAnimalRequest {
  id: string;
}

class ShowAnimalService {
  async execute({ id }: IAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animal = await animalsRepository.findOne(id);

    if (!animal) {
      throw new Error("Animal Not Found");
    }

    return animal;
  }
}

export { ShowAnimalService };
