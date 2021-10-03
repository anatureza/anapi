import { Request, Response } from "express";
import { ListAnimalsService } from "../../services/animals/ListAnimalsService";

class ListAnimalsController {
  async handle(req: Request, res: Response) {
    const listAnimalsService = new ListAnimalsService();

    const animals = await listAnimalsService.execute();

    return res.json(animals);
  }
}

export { ListAnimalsController };
