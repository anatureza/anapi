import { getCustomRepository } from "typeorm";
import { ReservationStatus } from "../../entities/Reservation";

import { ReservationsRepository } from "../../repositories/ReservationsRepository";

class ListNewReservationsService {
  async execute() {
    const reservationsRepository = getCustomRepository(ReservationsRepository);

    const reservations = await reservationsRepository.find({
      status: ReservationStatus.NEW,
    });

    return reservations;
  }
}

export { ListNewReservationsService };
