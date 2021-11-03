import { getCustomRepository, Not } from "typeorm";
import { format } from "date-fns";

import { ReservationStatus } from "../../entities/Reservation";
import { UserType } from "../../entities/User";
import { ReservationsRepository } from "../../repositories/ReservationsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

import { checkScheduledAtFromAnimalTimestamp } from "../../utils/verifyDate";

interface IReservationRequest {
  reservation_id: string;
  user_id: string;
  scheduled_at: string;
}

class ApproveReservationService {
  async execute({
    reservation_id,
    user_id,
    scheduled_at,
  }: IReservationRequest) {
    const reservationsRepository = getCustomRepository(ReservationsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    const reservation = await reservationsRepository.findOne(reservation_id, {
      relations: ["animal"],
    });

    if (!reservation) {
      throw new Error("Reservation Does Not Exist");
    }

    const volunteerIsTheSame = user.id === reservation.animal.volunteer_id;

    if (!volunteerIsTheSame) {
      if (user.type !== UserType.ADMIN) {
        throw new Error("Not Authorized");
      }
    }

    let formatScheduledAt = format(
      new Date(scheduled_at),
      "yyyy-MM-dd kk:mm:ss"
    );

    const otherReservationsFromAnimal = await reservationsRepository.find({
      where: {
        id: Not(reservation_id),
        animal_id: reservation.animal_id,
        scheduled_at: Not(null),
      },
    });

    if (otherReservationsFromAnimal) {
      const datesToCompare = otherReservationsFromAnimal.map(
        (otherReservation) => {
          return otherReservation.scheduled_at.toString();
        }
      );

      formatScheduledAt = checkScheduledAtFromAnimalTimestamp(
        scheduled_at,
        datesToCompare
      );
    }

    try {
      await reservationsRepository.update(
        { id: reservation_id },
        {
          status: ReservationStatus.APPROVED,
          scheduled_at: formatScheduledAt,
        }
      );

      return [reservation.animal, reservation];
    } catch (error) {
      throw new Error("Reservation Approval Error");
    }
  }
}

export { ApproveReservationService };
