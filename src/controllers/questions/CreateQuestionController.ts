import { Request, Response } from "express";
import { CreateQuestionService } from "../../services/question/CreateQuestionService";

class CreateQuestionController {
  async handle(req: Request, res: Response) {
    const { order, question_title } = req.body;

    const createQuestionService = new CreateQuestionService();

    const question = await createQuestionService.execute({
      order,
      question_title,
    });

    return res.json(question);
  }
}

export { CreateQuestionController };
