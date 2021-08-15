import { getCustomRepository } from "typeorm";

import { ReservationStatus } from "../../entities/Reservation";
import { UserType } from "../../entities/User";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";

import { ReservationsRepository } from "../../repositories/ReservationsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IAdoptionRequest {
  reservation_id: string;
  user_id: string;
}

class ConfirmAdoptionService {
  async execute({ reservation_id, user_id }: IAdoptionRequest) {
    const reservationsRepository = getCustomRepository(ReservationsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const reservation = await reservationsRepository.findOne(reservation_id);

    if (!reservation) {
      throw new Error("Reservation Does Not Exist!");
    }

    const user = await usersRepository.findOne(user_id);

    const volunteerIsTheSame = user.id === reservation.animal.volunteer_id;

    if (!volunteerIsTheSame) {
      if (user.type !== UserType.ADMIN) {
        throw new Error("Not Authorized");
      }
    }

    try {
      await reservationsRepository.update(
        { id: reservation_id },
        {
          status: ReservationStatus.ADOPTED,
        }
      );

      await animalsRepository.update(
        { id: reservation.animal_id },
        { available: false }
      );

      return [reservation.animal, reservation];
    } catch (error) {
      throw new Error(`Could Not Approve Adoption. (${error})`);
    }
  }
}

export { ConfirmAdoptionService };