import { getCustomRepository } from "typeorm";
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

    const deletedUserId = !user_id_params ? user_id : user_id_params;

    if (user_id_params) {
      const toBeDeleted = await usersRepository.findOne({
        id: user_id_params,
      });

      if (!toBeDeleted) {
        throw new Error("User Not Found");
      }

      if (toBeDeleted.admin && toBeDeleted.id !== userLoggedIn.id) {
        return { message: "You Can't Delete an Admin!" };
      }
    }

    const deletedUser = await usersRepository.findOne({ id: deletedUserId });

    if (!deletedUser) {
      throw new Error("User Does Not exist");
    }

    try {
      await usersRepository.delete({ id: deletedUser.id });
      await addressesRepository.delete({
        id: deletedUser.address_id,
      });
      return { message: `User ${deletedUser.name} deleted` };
    } catch {
      return { message: "An Error Occurred" };
    }
  }
}

export { DeleteUserService };
