import { getCustomRepository } from "typeorm";
import { QuestionsRepository } from "../../repositories/QuestionsRepository";

interface IQuestionRequest {
  order: number;
  updatedQuestionTitle: string;
}

class EditQuestionFromOrderService {
  async execute({ order, updatedQuestionTitle }: IQuestionRequest) {
    const questionsRepository = getCustomRepository(QuestionsRepository);

    const question = await questionsRepository.findOne({ order });

    if (!question) {
      throw new Error("Question does not exist");
    }

    await questionsRepository.update(
      { order },
      { question_title: updatedQuestionTitle }
    );

    return question;
  }
}

export { EditQuestionFromOrderService };
