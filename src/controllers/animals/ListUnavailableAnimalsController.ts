import { Request, Response } from "express";
import { ListUnavailableAnimalsService } from "../../services/animals/ListUnavailableAnimalsService";

class ListUnavailableAnimalsController {
  async handle(req: Request, res: Response) {
    const listUnavailableAnimalsService = new ListUnavailableAnimalsService();

    const { user_id } = req;

    const animals = await listUnavailableAnimalsService.execute({
      volunteer_id: user_id,
    });

    if (animals.length === 0) {
      return res.json([]);
    }

    return res.json(animals);
  }
}

export { ListUnavailableAnimalsController };
