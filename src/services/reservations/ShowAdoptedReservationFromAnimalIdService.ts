import { getCustomRepository } from "typeorm";
import { ReservationStatus } from "../../entities/Reservation";

import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { ReservationsRepository } from "../../repositories/ReservationsRepository";

interface IAnimalReservationRequest {
  animal_id: string;
}

class ShowAdoptedReservationFromAnimalIdService {
  async execute({ animal_id }: IAnimalReservationRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const reservationsRepository = getCustomRepository(ReservationsRepository);

    const animal = await animalsRepository.findOne({ id: animal_id });

    if (!animal) {
      throw new Error("Animal Not Found!");
    }

    const reservation = await reservationsRepository.findOne({
      where: { animal_id, status: ReservationStatus.ADOPTED },
    });

    if (!reservation) {
      throw new Error(
        "There is no Reservation marked as adopted from this Animal"
      );
    }

    return reservation;
  }
}

export { ShowAdoptedReservationFromAnimalIdService };
