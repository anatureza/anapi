import { EntityRepository, Repository } from "typeorm";
import { Answer } from "../entities/Answer";

@EntityRepository(Answer)
class AnswersRepository extends Repository<Answer> {}

export { AnswersRepository };
