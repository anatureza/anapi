import { Request, Response } from "express";
import { ListAllAvailableAnimalsService } from "../../services/animals/ListAllAvailableAnimalsService";

class ListAllAvailableAnimalsController {
  async handle(req: Request, res: Response) {
    const listAllAvailableAnimalsService = new ListAllAvailableAnimalsService();

    const animals = await listAllAvailableAnimalsService.execute();

    return res.json(animals);
  }
}

export { ListAllAvailableAnimalsController };
