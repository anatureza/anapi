import { getCustomRepository } from "typeorm";
import { UserType } from "../../entities/User";
import { AddressesRepository } from "../../repositories/AddressesRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IUserRequest {
  user_id: string;
  user_id_params?: string;
}

class DeleteUserService {
  async execute({ user_id, user_id_params }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressesRepository = getCustomRepository(AddressesRepository);

    const userLoggedIn = await usersRepository.findOne({ id: user_id });

    const userIdToBeDeleted = !user_id_params ? user_id : user_id_params;

    if (user_id_params) {
      const userFromParams = await usersRepository.findOne({
        id: user_id_params,
      });

      if (!userFromParams) {
        throw new Error("Specified User Does Not exist");
      }

      if (userLoggedIn.type !== UserType.ADMIN) {
        throw new Error("Unauthorized");
      }

      if (userFromParams.type === UserType.ADMIN) {
        throw new Error("User Cannot Be Deleted");
      }
    }

    const userToBeDeleted = await usersRepository.findOne(userIdToBeDeleted);

    try {
      await usersRepository.delete(userToBeDeleted.id);
      await addressesRepository.delete({
        id: userToBeDeleted.address_id,
      });
      return { message: `User ${userToBeDeleted.name} deleted` };
    } catch {
      throw new Error("User Could Not Be Deleted");
    }
  }
}

export { DeleteUserService };
