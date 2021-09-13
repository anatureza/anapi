import { getCustomRepository } from "typeorm";
import { UserType } from "../../entities/User";
import { AddressesRepository } from "../../repositories/AddressesRepository";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IAnimalRequest {
  id: string;
  volunteer_id: string;
}

class DeleteAnimalService {
  async execute({ id, volunteer_id }: IAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const addressesRepository = getCustomRepository(AddressesRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const animal = await animalsRepository.findOne(id);

    if (!animal) {
      throw new Error("Animal Does Not Exist!");
    }

    const address = await addressesRepository.findOne(animal.address_id);
    const user = await usersRepository.findOne(volunteer_id);

    if (user.type !== UserType.ADMIN) {
      if (animal.volunteer_id !== volunteer_id) {
        throw new Error("You Can't Edit this Animal");
      }
    }
    await addressesRepository.remove(address);
    await animalsRepository.remove(animal);
    return { message: `Animal ${animal.name} was deleted` };
  }
}

export { DeleteAnimalService };
