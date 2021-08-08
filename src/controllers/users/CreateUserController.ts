import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    // Get Address info
    const { place, number, complement, neighborhood, zip, city } = req.body;
    // Get User info
    const {
      name,
      email,
      password,
      phone_number,
      birth_date,
      authorizes_image,
    } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute(
      {
        name,
        email,
        password,
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
      }
    );

    return res.json(user);
  }
}

export { CreateUserController };
