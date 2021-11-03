import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ReservationStatus } from "../../entities/Reservation";
import { ReservationsQuizRepository } from "../../repositories/ReservationQuizRepository";

import { ReservationsRepository } from "../../repositories/ReservationsRepository";

interface IReservation {
  reservation_id: string;
}

class ShowReservationService {
  async execute({ reservation_id }: IReservation) {
    const reservationsRepository = getCustomRepository(ReservationsRepository);

    const reservation = await reservationsRepository.findOne({
      where: { id: reservation_id },
      relations: [
        "quiz",
        "userAdopter",
        "userAdopter.address",
        "animal",
        "animal.user",
        "animal.images",
      ],
    });

    if (!reservation) {
      throw new Error("Reservation Does Not Exist!");
    }

    return reservation;
  }
}

export { ShowReservationService };
