import { getCustomRepository } from "typeorm";
import { QuestionsRepository } from "../../repositories/QuestionsRepository";

interface IQuestionRequest {
  order: number;
  question_title: string;
}

class CreateQuestionService {
  async execute({ order, question_title }: IQuestionRequest) {
    const questionsRepository = getCustomRepository(QuestionsRepository);

    const orderAlreadyInUse = await questionsRepository.findOne({
      order,
    });

    if (orderAlreadyInUse) {
      throw new Error(`Question number ${order} already in use`);
    }

    const question = questionsRepository.create({
      order,
      question_title,
    });

    await questionsRepository.save(question);

    return question;
  }
}

export { CreateQuestionService };
