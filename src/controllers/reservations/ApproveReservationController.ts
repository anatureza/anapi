import { Request, Response } from "express";

import { ApproveOrNotReservationService } from "../../services/reservations/ApproveOrNotReservationService";

class ApproveReservationController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { reservation_id } = req.params;

    const approved = true;

    const approveOrNotReservationService = new ApproveOrNotReservationService();

    const reservation = approveOrNotReservationService.execute({
      user_id,
      reservation_id,
      approved,
    });

    return res.json(reservation);
  }
}

export { ApproveReservationController };
