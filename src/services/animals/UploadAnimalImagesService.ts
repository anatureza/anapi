import { getCustomRepository } from "typeorm";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

import { UserType } from "../../entities/User";
import { ImagesRepository } from "../../repositories/ImagesRepository";

interface IAnimalImageRequest {
  volunteer_id: string;
  animal_id: string;
  requestImages: Express.Multer.File[];
}

class UploadAnimalImagesService {
  async execute({
    volunteer_id,
    animal_id,
    requestImages,
  }: IAnimalImageRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);

    const animal = await animalsRepository.findOne(
      { id: animal_id },
      { relations: ["images"] }
    );

    if (!animal) {
      throw new Error("Animal Not Found!");
    }

    const volunteer = await usersRepository.findOne({ id: volunteer_id });

    if (volunteer.type !== UserType.ADMIN) {
      if (animal.volunteer_id !== volunteer_id) {
        throw new Error("You Can't Edit this Animal");
      }
    }

    const images = requestImages
      ? requestImages.map((image) => {
          return { path: image.filename, animal_id };
        })
      : null;

    if (images) {
      for (const image of images) {
        const entityImage = imagesRepository.create(image);
        await imagesRepository.save(entityImage);
      }
    }

    const allImagesFromAnimal = await imagesRepository.find({ animal_id });
    return allImagesFromAnimal;
  }
}

export { UploadAnimalImagesService };
