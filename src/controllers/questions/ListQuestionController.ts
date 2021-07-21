import { Request, response, Response } from "express";
import { ListQuestionService } from "../../services/question/ListQuestionsService";

class ListQuestionsController {
  async handle(req: Request, res: Response) {
    const listQuestionsService = new ListQuestionService();

    const questions = await listQuestionsService.execute();

    return res.json(questions);
  }
}

export { ListQuestionsController };
