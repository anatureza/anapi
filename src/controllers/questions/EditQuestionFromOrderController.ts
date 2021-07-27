import { Request, Response } from "express";
import { EditQuestionFromOrderService } from "../../services/questions/EditQuestionFromOrderService";

class EditQuestionFromOrderController {
  async handle(req: Request, res: Response) {
    const { order, question_title } = req.body;

    const editQuestionFromOrderService = new EditQuestionFromOrderService();

    const updatedQuestion = await editQuestionFromOrderService.execute({
      order,
      updatedQuestionTitle: question_title,
    });

    return res.json(updatedQuestion);
  }
}

export { EditQuestionFromOrderController };
