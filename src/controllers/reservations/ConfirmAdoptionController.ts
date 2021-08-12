import { Request, Response } from "express";

import { ConfirmAdoptionService } from "../../services/reservations/ConfirmAdoptionService";

class ConfirmAdoptionController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const { reservation_id } = req.params;

    const confirmAdoptionService = new ConfirmAdoptionService();

    const adoption = confirmAdoptionService.execute({
      user_id,
      reservation_id,
    });

    return res.json(adoption);
  }
}

export { ConfirmAdoptionController };
