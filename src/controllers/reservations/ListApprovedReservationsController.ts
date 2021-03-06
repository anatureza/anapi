import { Request, Response } from "express";
import { ListApprovedReservationsService } from "../../services/reservations/ListApprovedReservationsService";

class ListApprovedReservationsController {
  async handle(req: Request, res: Response) {
    const listApprovedReservationsService = new ListApprovedReservationsService();

    const reservations = await listApprovedReservationsService.execute();

    return res.json(reservations);
  }
}

export { ListApprovedReservationsController };
