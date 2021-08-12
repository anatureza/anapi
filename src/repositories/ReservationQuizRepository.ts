import { EntityRepository, Repository } from "typeorm";
import { ReservationQuiz } from "../entities/ReservationQuiz";

@EntityRepository(ReservationQuiz)
class ReservationsQuizRepository extends Repository<ReservationQuiz> {}

export { ReservationsQuizRepository };
