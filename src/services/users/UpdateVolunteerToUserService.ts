import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../../repositories/UsersRepository";
import { UserType } from "../../entities/User";

interface IUserIds {
  userId: string;
}

class UpdateVolunteerToUserService {
  async execute({ userId }: IUserIds) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userToBeDowngraded = await usersRepository.findOne({
      id: userId,
    });

    if (!userToBeDowngraded) {
      throw new Error("User not found!");
    }

    try {
      userToBeDowngraded.type = UserType.USER;

      const updatedUser = await usersRepository.save(userToBeDowngraded);

      return updatedUser;
    } catch {
      throw new Error("User Could not be Updated!");
    }
  }
}

export { UpdateVolunteerToUserService };
