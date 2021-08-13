import { getCustomRepository } from "typeorm";

import path from "path";
import fs from "fs";

import uploadConfig from "../../config/upload";

import { UsersRepository } from "../../repositories/UsersRepository";

interface IUserAvatarRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  async execute({ user_id, avatarFilename }: IUserAvatarRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error("User Not Found");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };
