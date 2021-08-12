import { getCustomRepository } from "typeorm";
import { ReservationStatus } from "../../entities/Reservation";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { ReservationsQuizRepository } from "../../repositories/ReservationQuizRepository";
import { ReservationsRepository } from "../../repositories/ReservationsRepository";

interface IReservationRequest {
  user_id: string;
  animal_id: string;
}

interface IQuizRequest {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
  seventh: string;
  eighth: string;
  ninth: string;
  tenth: string;
  eleventh: string;
  twelfth: string;
  thirteenth: string;
  fourteenth: string;
  fifteenth: string;
}

class CreateReservationService {
  async execute(
    { user_id, animal_id }: IReservationRequest,
    {
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      ninth,
      tenth,
      eleventh,
      twelfth,
      thirteenth,
      fourteenth,
      fifteenth,
    }: IQuizRequest
  ) {
    const reservationsRepository = getCustomRepository(ReservationsRepository);
    const reservationsQuizRepository = getCustomRepository(
      ReservationsQuizRepository
    );
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animal = await animalsRepository.findOne(animal_id);

    if (!animal) {
      throw new Error("Animal Does Not Exist!");
    }

    const quiz = reservationsQuizRepository.create({
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      ninth,
      tenth,
      eleventh,
      twelfth,
      thirteenth,
      fourteenth,
      fifteenth,
    });

    await reservationsQuizRepository.save(quiz);

    try {
      const reservation = reservationsRepository.create({
        adopter_id: user_id,
        animal_id: animal.id,
        status: ReservationStatus.NEW,
        quiz_id: quiz.id,
      });

      await reservationsRepository.save(reservation);

      return [reservation.animal, reservation];
    } catch (error) {
      throw new Error(`Reservation Could Not be Created (${error})`);
    }
  }
}

export { CreateReservationService };
