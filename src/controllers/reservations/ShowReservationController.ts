import { Request, Response } from "express";
import { ShowReservationService } from "../../services/reservations/ShowReservationService";

class ShowReservationController {
  async handle(req: Request, res: Response) {
    const { reservation_id } = req.params;

    const showReservationQuizService = new ShowReservationService();

    const reservation = await showReservationQuizService.execute({
      reservation_id,
    });

    return res.json(reservation);
  }
}

export { ShowReservationController };
