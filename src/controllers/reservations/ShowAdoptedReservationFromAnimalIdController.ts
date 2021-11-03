import { Request, Response } from "express";
import { ShowAdoptedReservationFromAnimalIdService } from "../../services/reservations/ShowAdoptedReservationFromAnimalIdService";

class ShowAdoptedReservationFromAnimalIdController {
  async handle(req: Request, res: Response) {
    const { animal_id } = req.params;

    const showAdoptedReservationFromAnimalIdService =
      new ShowAdoptedReservationFromAnimalIdService();

    const reservation = await showAdoptedReservationFromAnimalIdService.execute(
      {
        animal_id,
      }
    );

    return res.json(reservation);
  }
}

export { ShowAdoptedReservationFromAnimalIdController };
