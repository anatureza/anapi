import { getCustomRepository } from "typeorm";
import { QuestionsRepository } from "../../repositories/QuestionsRepository";

class ListQuestionService {
  async execute() {
    const questionsRepository = getCustomRepository(QuestionsRepository);

    const questions = await questionsRepository.find();

    return questions;
  }
}

export { ListQuestionService };
