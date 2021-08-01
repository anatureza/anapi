import { getCustomRepository } from "typeorm";
import { AddressesRepository } from "../../repositories/AddressesRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IUserRequest {
  user_id: string;
  user_id_params: string;
}

class DeleteUserService {
  async execute({ user_id, user_id_params }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressesRepository = getCustomRepository(AddressesRepository);

    if (user_id !== user_id_params) {
      throw new Error("You can only delete your account");
    }

    const user = await usersRepository.findOne({ id: user_id });

    if (!user) {
      throw new Error("User does not exist");
    }

    const address = await addressesRepository.findOne({ id: user.address_id });

    if (!address) {
      throw new Error("Address Id does not exist!");
    }

    try {
      await usersRepository.delete({ id: user_id });
      await addressesRepository.delete({
        id: user.address_id,
      });
      return { message: `User ${user.name} deleted` };
    } catch (err) {
      return { message: "An error occurred" };
    }
  }
}

export { DeleteUserService };
