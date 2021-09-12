import { Request, Response } from "express";
import { ListAnimalsFromAuthUserService } from "../../services/animals/ListAnimalsFromAuthUserService";

class ListAnimalsFromAuthUserController {
  async handle(req: Request, res: Response) {
    const listAnimalsFromAuthUserService = new ListAnimalsFromAuthUserService();

    const { user_id } = req;

    const animals = await listAnimalsFromAuthUserService.execute({
      volunteer_id: user_id,
    });

    if (!(animals.length > 0)) return res.json({ message: "No Animals Found" });

    return res.json(animals);
  }
}

export { ListAnimalsFromAuthUserController };
