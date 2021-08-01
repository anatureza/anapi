import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IUserRequest {
  id: string;
}

class ShowAuthenticatedUserService {
  async execute({ id }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(
      { id },
      { relations: ["address"] }
    );

    return classToPlain(user);
  }
}

export { ShowAuthenticatedUserService };
