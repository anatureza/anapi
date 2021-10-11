import { Request, Response } from "express";

import { UploadAnimalImagesService } from "../../services/animals/UploadAnimalImagesService";

class UploadAnimalImagesController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { animal_id } = req.params;

    const requestImages = req.files
      ? (req.files as Express.Multer.File[])
      : null;

    const uploadAnimalImagesService = new UploadAnimalImagesService();

    const images = await uploadAnimalImagesService.execute({
      volunteer_id: user_id,
      animal_id,
      requestImages,
    });

    return res.json(images);
  }
}

export { UploadAnimalImagesController };
