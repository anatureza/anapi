import { getCustomRepository } from "typeorm";
import { ReservationStatus } from "../../entities/Reservation";

import { ReservationsRepository } from "../../repositories/ReservationsRepository";

interface IReservation {
  animal_id: string;
}

class ShowLastScheduledAtFromAnimalIdService {
  async execute({ animal_id }: IReservation) {
    const reservationsRepository = getCustomRepository(ReservationsRepository);

    const reservation = await reservationsRepository.findOne({
      where: { animal_id: animal_id, status: ReservationStatus.APPROVED },
      order: { scheduled_at: "DESC" },
    });

    if (!reservation) {
      return true;
    }

    const lastScheduledAt = reservation.scheduled_at;

    return lastScheduledAt;
  }
}

export { ShowLastScheduledAtFromAnimalIdService };
