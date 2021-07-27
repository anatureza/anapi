import { getCustomRepository } from "typeorm";
import { QuestionsRepository } from "../../repositories/QuestionsRepository";

interface IQuestionRequest {
  id: string;
}

class DeleteQuestionFromIdService {
  async execute({ id }: IQuestionRequest) {
    const questionsRepository = getCustomRepository(QuestionsRepository);

    const question = await questionsRepository.findOne({ id });

    if (!question) {
      throw new Error("Question does not exist!");
    }

    const result = await questionsRepository.delete(question);

    return result;
  }
}

export { DeleteQuestionFromIdService };
