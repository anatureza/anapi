import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ReservationStatus } from "../../entities/Reservation";

import { ReservationsRepository } from "../../repositories/ReservationsRepository";

class ListNewReservationsService {
  async execute() {
    const reservationsRepository = getCustomRepository(ReservationsRepository);

    const reservations = await reservationsRepository.find({
      where: { status: ReservationStatus.NEW },
      order: { created_at: "ASC" },
      relations: ["animal", "animal.user", "animal.images", "userAdopter"],
    });

    if (!reservations || reservations.length <= 0) {
      return [];
    }

    return classToPlain(reservations);
  }
}

export { ListNewReservationsService };
