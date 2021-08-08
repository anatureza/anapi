import { getCustomRepository } from "typeorm";
import { UserType } from "../../entities/User";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IAnimalRequest {
  id: string;
  volunteer_id: string;
}

class DeleteAnimalService {
  async execute({ id, volunteer_id }: IAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

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

    try {
      await animalsRepository.delete(animal);
      return { message: `Animal ${animal.name} was deleted` };
    } catch {
      throw new Error("Animal Could Not Be Deleted");
    }
  }
}

export { DeleteAnimalService };
