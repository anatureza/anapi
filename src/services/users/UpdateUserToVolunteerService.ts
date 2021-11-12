import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../../repositories/UsersRepository";
import { UserType } from "../../entities/User";

interface IUserIds {
  userId: string;
}

class UpdateUserToVolunteerService {
  async execute({ userId }: IUserIds) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userToBePromoted = await usersRepository.findOne({
      id: userId,
    });

    if (!userToBePromoted) {
      throw new Error("User not found!");
    }

    try {
      userToBePromoted.type = UserType.VOLUNTEER;

      const updatedUser = await usersRepository.save(userToBePromoted);

      return updatedUser;
    } catch {
      throw new Error("User Could not be Updated!");
    }
  }
}

export { UpdateUserToVolunteerService };
