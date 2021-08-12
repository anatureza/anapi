import { Request, Response } from "express";
import { ListDisapprovedReservationsService } from "../../services/reservations/ListDisapprovedReservationsService";

class ListDisapprovedReservationsController {
  async handle(req: Request, res: Response) {
    const listDisapprovedReservationsService =
      new ListDisapprovedReservationsService();

    const reservations = listDisapprovedReservationsService.execute();

    return reservations;
  }
}

export { ListDisapprovedReservationsController };
