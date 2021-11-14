import { Request, Response } from "express";
import { ListAvailableAnimalsService } from "../../services/animals/ListAvailableAnimalsService";

class ListAvailableAnimalsController {
  async handle(req: Request, res: Response) {
    const listAvailableAnimalsService = new ListAvailableAnimalsService();

    const { user_id } = req;

    const animals = await listAvailableAnimalsService.execute({
      volunteer_id: user_id,
    });

    if (animals.length === 0) {
      return res.json([]);
    }

    return res.json(animals);
  }
}

export { ListAvailableAnimalsController };
