import { getCustomRepository } from "typeorm";
import { ReservationStatus } from "../../entities/Reservation";
import { UserType } from "../../entities/User";
import { ReservationsRepository } from "../../repositories/ReservationsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IReservationRequest {
  reservation_id: string;
  user_id: string;
  approved: boolean;
}

class ApproveOrNotReservationService {
  async execute({ reservation_id, user_id, approved }: IReservationRequest) {
    const reservationsRepository = getCustomRepository(ReservationsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    const reservation = await reservationsRepository.findOne(reservation_id);

    if (!reservation) {
      throw new Error("Reservation Does Not Exist");
    }

    const volunteerIsTheSame = user.id === reservation.animal.volunteer_id;

    if (!volunteerIsTheSame) {
      if (user.type !== UserType.ADMIN) {
        throw new Error("Not Authorized");
      }
    }

    try {
      if (approved) {
        await reservationsRepository.update(
          { id: reservation_id },
          {
            status: ReservationStatus.APPROVED,
          }
        );

        return [reservation.animal, reservation];
      }

      await reservationsRepository.update(
        { id: reservation_id },
        {
          status: ReservationStatus.DISAPPROVED,
        }
      );

      return reservation;
    } catch (error) {
      throw new Error("Reservation Status Error");
    }
  }
}

export { ApproveOrNotReservationService };
