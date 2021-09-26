import { getCustomRepository } from "typeorm";

import path from "path";
import fs from "fs";

import uploadConfig from "../../config/upload";

import { UserType } from "../../entities/User";

import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { ImagesRepository } from "../../repositories/ImagesRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IAnimalRequest {
  id: string;
  volunteer_id: string;
}

class DeleteAnimalService {
  async execute({ id, volunteer_id }: IAnimalRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const animal = await animalsRepository.findOne(id, {
      relations: ["images"],
    });

    if (!animal) {
      throw new Error("Animal Does Not Exist!");
    }

    const user = await usersRepository.findOne(volunteer_id);

    if (user.type !== UserType.ADMIN) {
      if (animal.volunteer_id !== volunteer_id) {
        throw new Error("You Can't Edit this Animal");
      }
    }

    if (animal.images.length > 0) {
      const images = await imagesRepository.find({ animal_id: id });

      await Promise.all(
        images.map(async (image) => {
          const imageFilePath = path.join(uploadConfig.directory, image.path);
          const imageFileExists = await fs.promises.stat(imageFilePath);

          if (imageFileExists) {
            await fs.promises.unlink(imageFilePath);
          }
        })
      );

      await imagesRepository.remove(images);
    }

    await animalsRepository.remove(animal);
    return { message: `Animal ${animal.name} was deleted` };
  }
}

export { DeleteAnimalService };
