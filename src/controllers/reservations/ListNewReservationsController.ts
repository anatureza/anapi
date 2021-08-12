import { request, Request, Response } from "express";
import { ListNewReservationsService } from "../../services/reservations/ListNewReservationsService";

class ListNewReservationsController {
  async handle(req: Request, res: Response) {
    const listNewReservationsService = new ListNewReservationsService();

    const reservations = await listNewReservationsService.execute();

    return res.json(reservations);
  }
}

export { ListNewReservationsController };
