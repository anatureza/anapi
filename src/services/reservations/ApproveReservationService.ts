import { getCustomRepository, Not } from "typeorm";
import { format, isAfter, isBefore } from "date-fns";

import { ReservationStatus } from "../../entities/Reservation";
import { UserType } from "../../entities/User";
import { ReservationsRepository } from "../../repositories/ReservationsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

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

    const lastReservation = await reservationsRepository.findOne({
      where: {
        id: Not(reservation_id),
        animal_id: reservation.animal_id,
        status: ReservationStatus.APPROVED,
      },
      order: { scheduled_at: "DESC" },
    });

    if (lastReservation) {
      const lastScheduledAt = new Date(lastReservation.scheduled_at);

      if (isBefore(new Date(scheduled_at), lastScheduledAt)) {
        throw new Error("There is already a reservation scheduled after");
      }
    }

    const formatScheduledAt = format(
      new Date(scheduled_at),
      "yyyy-MM-dd HH:mm:ss"
    );

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
