import { Request, Response } from "express";

import { ApproveReservationService } from "../../services/reservations/ApproveReservationService";

class ApproveReservationController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { reservation_id } = req.params;

    const { scheduled_at } = req.body;

    const approveReservationService = new ApproveReservationService();

    const reservation = approveReservationService.execute({
      user_id,
      reservation_id,
      scheduled_at,
    });

    return res.json(reservation);
  }
}

export { ApproveReservationController };
