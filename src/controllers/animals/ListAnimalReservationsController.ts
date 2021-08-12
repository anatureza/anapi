import { Request, Response } from "express";

import { ListAnimalReservationsService } from "../../services/animals/ListAnimalReservationsService";

class ListAnimalReservationsController {
  async handle(req: Request, res: Response) {
    const listAnimalReservationsService = new ListAnimalReservationsService();

    const { animal_id } = req.params;

    const reservations = await listAnimalReservationsService.execute({
      animal_id,
    });

    return res.json(reservations);
  }
}

export { ListAnimalReservationsController };
