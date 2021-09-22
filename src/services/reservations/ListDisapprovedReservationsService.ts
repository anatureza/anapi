import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ReservationStatus } from "../../entities/Reservation";
import { ReservationsRepository } from "../../repositories/ReservationsRepository";

class ListDisapprovedReservationsService {
  async execute() {
    const reservationsRepository = getCustomRepository(ReservationsRepository);

    const reservations = await reservationsRepository.find({
      where: { status: ReservationStatus.DISAPPROVED },
      relations: ["animal", "userAdopter"],
    });

    if (reservations.length <= 0) {
      return [];
    }

    return classToPlain(reservations);
  }
}

export { ListDisapprovedReservationsService };
