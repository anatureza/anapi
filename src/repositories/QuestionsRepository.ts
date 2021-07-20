import { EntityRepository, Repository } from "typeorm";
import { Question } from "../entities/Question";

@EntityRepository(Question)
class QuestionsRepository extends Repository<Question> {}

export { QuestionsRepository };
