import { Request, Response } from "express";
import { ListApprovedReservationsService } from "../../services/reservations/ListApprovedReservationsService";

class ListApprovedReservationsController {
  async handle(req: Request, res: Response) {
    const listApprovedReservationsService =
      new ListApprovedReservationsService();

    const reservations = listApprovedReservationsService.execute();

    return reservations;
  }
}

export { ListApprovedReservationsController };
