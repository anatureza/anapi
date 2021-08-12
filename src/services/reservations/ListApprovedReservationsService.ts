import { getCustomRepository } from "typeorm";
import { ReservationStatus } from "../../entities/Reservation";
import { ReservationsRepository } from "../../repositories/ReservationsRepository";

class ListApprovedReservationsService {
  async execute() {
    const reservationsRepository = getCustomRepository(ReservationsRepository);

    const reservations = await reservationsRepository.find({
      status: ReservationStatus.APPROVED,
    });

    return reservations;
  }
}

export { ListApprovedReservationsService };
