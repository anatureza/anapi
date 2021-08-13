import { getCustomRepository } from "typeorm";

import { TasksRepository } from "../../repositories/TasksRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UserType } from "../../entities/User";

interface ITaskRequest {
  user_id: string;
  task_id: string;
  title: string;
  description?: string;
  expected_at: Date;
  done: boolean;
}

class EditTaskService {
  async execute({
    user_id,
    task_id,
    title,
    description,
    expected_at,
    done,
  }: ITaskRequest) {
    const tasksRepository = getCustomRepository(TasksRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const task = await tasksRepository.findOne(task_id);

    if (!task) {
      throw new Error("Task Does Not Exist");
    }

    const user = await usersRepository.findOne(user_id);

    if (task.animal.volunteer_id !== user_id) {
      if (user.type !== UserType.ADMIN) {
        throw new Error("Not Authorized");
      }
    }

    const done_at = done ? new Date(Date.now()) : "";

    try {
      await tasksRepository.update(task_id, {
        title,
        description,
        expected_at,
        done,
        done_at,
      });

      const updatedTask = await tasksRepository.findOne(task_id);

      return updatedTask;
    } catch (error) {
      throw new Error(`Task Could Not Be Edited (${error})`);
    }
  }
}

export { EditTaskService };
