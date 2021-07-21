import { Request, Response } from "express";
import { DeleteQuestionFromIdService } from "../../services/question/DeleteQuestionFromIdService";

class DeleteQuestionFromIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const deleteQuestionService = new DeleteQuestionFromIdService();

    const result = await deleteQuestionService.execute({
      id,
    });

    return res.json(result);
  }
}

export { DeleteQuestionFromIdController };
