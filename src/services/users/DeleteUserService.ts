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

    if (user_id_params) {
      const userFromParams = await usersRepository.findOne({
        id: user_id_params,
      });

      if (!userFromParams) {
        throw new Error("Specified User Does Not exist");
      }

      if (userFromParams.type === UserType.ADMIN) {
        throw new Error("User Cannot Be Deleted");
      }
    }

    try {
      await usersRepository.delete({ id: userLoggedIn.id });
      await addressesRepository.delete({
        id: userLoggedIn.address_id,
      });
      return { message: `User ${userLoggedIn.name} deleted` };
    } catch {
      throw new Error("User Could Not Be Deleted");
    }
  }
}

export { DeleteUserService };
