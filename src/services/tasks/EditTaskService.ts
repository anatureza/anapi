import { getCustomRepository } from "typeorm";

import { TasksRepository } from "../../repositories/TasksRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UserType } from "../../entities/User";
import { checkExpectedAtTimestamp } from "../../utils/verifyDate";

interface ITaskRequest {
  user_id: string;
  task_id: string;
  title: string;
  description?: string;
  expected_at?: string;
}

class EditTaskService {
  async execute({
    user_id,
    task_id,
    title,
    description,
    expected_at = "",
  }: ITaskRequest) {
    const tasksRepository = getCustomRepository(TasksRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const task = await tasksRepository.findOne({
      where: { id: task_id },
      relations: ["animal"],
    });

    if (!task) {
      throw new Error("Task Does Not Exist");
    }

    const user = await usersRepository.findOne({ id: user_id });

    if (task.animal.volunteer_id !== user_id) {
      if (user.type !== UserType.ADMIN) {
        throw new Error("Not Authorized");
      }
    }

    if (expected_at !== "") {
      const expectedAt = checkExpectedAtTimestamp(expected_at);
      task.expected_at = expectedAt;
    }

    task.title = title;
    task.description = description;

    const updatedTask = await tasksRepository.save(task);

    return updatedTask;
  }
}

export { EditTaskService };
