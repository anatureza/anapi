import { Request, Response } from "express";
import { EditUserAddressService } from "../../services/users/EditUserAddressService";

class EditUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { name, birth_date, authorizes_image } = req.body;

    const { place, number, complement, neighborhood, zip, city } = req.body;

    const editUserAddressService = new EditUserAddressService();

    const updatedUser = await editUserAddressService.execute({
      user_id,
      name,
      birth_date,
      authorizes_image,
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    });

    return res.json(updatedUser);
  }
}

export { EditUserController };
