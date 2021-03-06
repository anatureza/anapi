import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/UsersRepository";

class ListAllUsersService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find({
      relations: ["address"],
    });

    return classToPlain(users);
  }
}

export { ListAllUsersService };
