import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";

import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { ReservationsRepository } from "../../repositories/ReservationsRepository";

interface IAnimalReservationRequest {
  animal_id: string;
}

class ListAnimalReservationsService {
  async execute({ animal_id }: IAnimalReservationRequest) {
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const reservationsRepository = getCustomRepository(ReservationsRepository);

    const animal = await animalsRepository.findOne(animal_id);

    if (!animal) {
      throw new Error("Animal Not Found!");
    }

    const reservations = await reservationsRepository.find({
      animal_id,
    });

    return classToPlain(reservations);
  }
}

export { ListAnimalReservationsService };
