import { Request, Response } from "express";
import { EditUserService } from "../../services/users/EditUserService";

class EditUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { name, phone_number, birth_date, authorizes_image } = req.body;

    const { place, number, complement, neighborhood, zip, city, uf } = req.body;

    const editUserService = new EditUserService();

    const updatedUser = await editUserService.execute(
      {
        user_id,
        name,
        phone_number,
        birth_date,
        authorizes_image,
      },
      {
        place,
        number,
        complement,
        neighborhood,
        zip,
        city,
        uf,
      }
    );

    return res.json(updatedUser);
  }
}

export { EditUserController };
