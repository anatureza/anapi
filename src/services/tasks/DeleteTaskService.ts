import { getCustomRepository } from "typeorm";
import { UserType } from "../../entities/User";

import { TasksRepository } from "../../repositories/TasksRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

interface ITaskRequest {
  task_id: string;
  user_id: string;
}

class DeleteTaskService {
  async execute({ task_id, user_id }: ITaskRequest) {
    const tasksRepository = getCustomRepository(TasksRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const task = await tasksRepository.findOne(task_id);

    if (!task) {
      throw new Error("Task Not Found");
    }

    const user = await usersRepository.findOne(user_id);

    if (task.animal.volunteer_id !== user_id) {
      if (user.type !== UserType.ADMIN) {
        throw new Error("Not Authorized");
      }
    }

    try {
      await tasksRepository.delete(task_id);

      return { message: `Task ${task.title} Deleted` };
    } catch (error) {
      throw new Error(`Task ${task.title} Could Not Be Deleted`);
    }
  }
}

export { DeleteTaskService };
