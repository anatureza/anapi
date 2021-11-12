import { getCustomRepository } from "typeorm";

import path from "path";
import fs from "fs";

import uploadConfig from "../../config/upload";

import { UsersRepository } from "../../repositories/UsersRepository";
import { classToPlain } from "class-transformer";

interface IUserAvatarRequest {
  user_id: string;
  requestAvatar: Express.Multer.File;
}

class UpdateUserAvatarService {
  async execute({ user_id, requestAvatar }: IUserAvatarRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error("User Not Found");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = requestAvatar.filename;

    const updatedUserAvatar = await usersRepository.save(user);

    return classToPlain(updatedUserAvatar);
  }
}

export { UpdateUserAvatarService };
