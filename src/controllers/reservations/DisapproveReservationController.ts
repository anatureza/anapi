import { Request, Response } from "express";

import { DisapproveReservationService } from "../../services/reservations/DisapproveReservationService";

class DisapproveReservationController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { reservation_id } = req.params;

    const approved = false;

    const disapproveReservationService = new DisapproveReservationService();

    const reservation = disapproveReservationService.execute({
      user_id,
      reservation_id,
    });

    return res.json(reservation);
  }
}

export { DisapproveReservationController };
