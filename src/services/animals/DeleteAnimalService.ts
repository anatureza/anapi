import { getCustomRepository } from "typeorm";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";

interface IAnimalRequest {
  id: string;
  volunteer_id: string;
}

class DeleteAnimalService {
  async execute({ id, volunteer_id }: IAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animal = await animalsRepository.findByIdAndVolunteerId({
      id,
      volunteer_id,
    });

    if (!animal) {
      throw new Error("No Animal From this User was Found");
    }

    try {
      await animalsRepository.delete(animal);
      return { message: `Animal ${animal.name} was deleted` };
    } catch {
      throw new Error("Animal Could Not Be Deleted");
    }
  }
}

export { DeleteAnimalService };
