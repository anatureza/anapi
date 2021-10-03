import { Request, Response } from "express";
import { DeleteAnimalImageService } from "../../services/animals/DeleteAnimalImageService";

class DeleteAnimalImageController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { animal_id, image_id } = req.params;

    const deleteAnimalImageService = new DeleteAnimalImageService();

    const images = await deleteAnimalImageService.execute({
      user_id,
      animal_id,
      image_id,
    });

    return res.json(images);
  }
}

export { DeleteAnimalImageController };
