import { Request, Response } from "express";
import { ListDisapprovedReservationsService } from "../../services/reservations/ListDisapprovedReservationsService";

class ListDisapprovedReservationsController {
  async handle(req: Request, res: Response) {
    const listDisapprovedReservationsService = new ListDisapprovedReservationsService();

    const reservations = await listDisapprovedReservationsService.execute();

    return res.json(reservations);
  }
}

export { ListDisapprovedReservationsController };
