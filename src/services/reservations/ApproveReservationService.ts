import { getCustomRepository } from "typeorm";
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

    try {
      // TODO: Verify other reservations from animal
      // *There cannot be a new approved reservation scheduled_date before another
      await reservationsRepository.update(
        { id: reservation_id },
        {
          status: ReservationStatus.APPROVED,
          scheduled_at,
        }
      );

      return [reservation.animal, reservation];
    } catch (error) {
      throw new Error("Reservation Approval Error");
    }
  }
}

export { ApproveReservationService };
