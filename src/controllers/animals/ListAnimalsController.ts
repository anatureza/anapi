import { Request, Response } from "express";
import { ListAnimalsService } from "../../services/animals/ListAnimalsService";

class ListAnimalsController {
  async handle(req: Request, res: Response) {
    const listAnimalsService = new ListAnimalsService();

    const animals = await listAnimalsService.execute();

    if (!(animals.length > 0)) return res.json({ message: "No Animals Found" });

    return res.json(animals);
  }
}

export { ListAnimalsController };
