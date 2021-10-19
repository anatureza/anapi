import path from "path";
import fs from "fs";

import { getCustomRepository } from "typeorm";

import uploadConfig from "../../config/upload";

import { UserType } from "../../entities/User";

import { UsersRepository } from "../../repositories/UsersRepository";
import { UserTokensRepository } from "../../repositories/UserTokensRepository";

import { DeleteAddressService } from "../addresses/DeleteAddressService";

interface IUserRequest {
  user_id: string;
  user_id_params?: string;
}

class DeleteUserService {
  async execute({ user_id, user_id_params }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const deleteAddressService = new DeleteAddressService();

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

    const userToBeDeleted = await usersRepository.findOne(userIdToBeDeleted, {
      relations: ["address"],
    });

    try {
      if (userToBeDeleted.avatar) {
        const userToBeDeletedAvatarFilePath = path.join(uploadConfig.directory);
        const userToBeDeletedAvatarFileExists = await fs.promises.stat(
          userToBeDeletedAvatarFilePath
        );

        if (userToBeDeletedAvatarFileExists) {
          await fs.promises.unlink(userToBeDeletedAvatarFilePath);
        }
      }

      const userTokens = await userTokensRepository.find({
        user_id: userToBeDeleted.id,
      });
      if (userTokens) {
        await userTokensRepository.remove(userTokens);
      }

      await usersRepository.remove(userToBeDeleted);
      await deleteAddressService.execute({ id: userToBeDeleted.address_id });

      return { message: `User ${userToBeDeleted.name} deleted` };
    } catch (error) {
      throw new Error(`User Could Not Be Deleted! (${error})`);
    }
  }
}

export { DeleteUserService };
