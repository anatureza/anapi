import { EntityRepository, Repository } from "typeorm";
import { Reservation } from "../entities/Reservation";

@EntityRepository(Reservation)
class ReservationsRepository extends Repository<Reservation> {}

export { ReservationsRepository };
