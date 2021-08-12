import { Request, Response } from "express";
import { CreateReservationService } from "../../services/reservations/CreateReservationService";

class CreateReservationController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { animal_id } =
      req.params.animal_id !== "undefined" ? req.params : req.body;

    const {
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      ninth,
      tenth,
      eleventh,
      twelfth,
      thirteenth,
      fourteenth,
      fifteenth,
    } = req.body;

    const createReservationService = new CreateReservationService();

    const reservation = await createReservationService.execute(
      {
        user_id,
        animal_id,
      },
      {
        first,
        second,
        third,
        fourth,
        fifth,
        sixth,
        seventh,
        eighth,
        ninth,
        tenth,
        eleventh,
        twelfth,
        thirteenth,
        fourteenth,
        fifteenth,
      }
    );

    return res.json(reservation);
  }
}

export { CreateReservationController };
