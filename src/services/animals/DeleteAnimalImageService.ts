import { getCustomRepository } from "typeorm";

import path from "path";
import fs from "fs";

import uploadConfig from "../../config/upload";

import { ImagesRepository } from "../../repositories/ImagesRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UserType } from "../../entities/User";

interface IAnimalImageRequest {
  user_id: string;
  animal_id: string;
  image_id: string;
}

class DeleteAnimalImageService {
  async execute({ user_id, animal_id, image_id }: IAnimalImageRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const animal = await animalsRepository.findOne(
      { id: animal_id },
      { relations: ["images"] }
    );

    if (!animal) {
      throw new Error("Animal Not Found");
    }

    const user = await usersRepository.findOne({ id: user_id });

    if (user.type !== UserType.ADMIN) {
      if (user_id !== animal.volunteer_id) {
        throw new Error("Unauthorized");
      }
    }

    const image = await imagesRepository.findOne({
      id: image_id,
      animal_id,
    });

    if (!image) {
      throw new Error("Animal Image Not Found");
    }

    try {
      await imagesRepository.remove(image);

      const imageFilePath = path.join(uploadConfig.directory, image.path);
      const imageFileExists = await fs.promises.stat(imageFilePath);

      if (imageFileExists) {
        await fs.promises.unlink(imageFilePath);
      }
    } catch {
      throw new Error("Animal Image Could Not Be Deleted");
    }

    const animalImages = await imagesRepository.find({ animal_id });

    if (animalImages.length <= 0) {
      return [];
    }

    return animalImages;
  }
}

export { DeleteAnimalImageService };
