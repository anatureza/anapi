import { Request, Response } from "express";
import { ShowLastScheduledAtFromAnimalIdService } from "../../services/reservations/ShowLastScheduledAtFromAnimalIdService";

class ShowLastScheduledAtFromAnimalIdController {
  async handle(req: Request, res: Response) {
    const { animal_id } = req.params;

    const showLastScheduledAtService =
      new ShowLastScheduledAtFromAnimalIdService();

    const lastScheduledAt = await showLastScheduledAtService.execute({
      animal_id,
    });

    return res.json({ lastScheduledAt: lastScheduledAt });
  }
}

export { ShowLastScheduledAtFromAnimalIdController };
