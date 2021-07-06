import { EntityRepository, Repository } from "typeorm";
import { Volunteer } from "../entities/Volunteer";

@EntityRepository(Volunteer)
class VolunteersRepository extends Repository<Volunteer> {}
export { VolunteersRepository };
