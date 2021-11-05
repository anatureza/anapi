import { getCustomRepository } from "typeorm";

import { TasksRepository } from "../../repositories/TasksRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UserType } from "../../entities/User";
import { parse } from "date-fns";

interface ITaskRequest {
  user_id: string;
  task_id: string;
  done: boolean;
}

class DoneOrUndoneTaskService {
  async execute({ user_id, task_id, done }: ITaskRequest) {
    const tasksRepository = getCustomRepository(TasksRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const task = await tasksRepository.findOne({
      where: { id: task_id },
      relations: ["animal"],
    });

    if (!task) {
      throw new Error("Task Does not Exist");
    }

    const user = await usersRepository.findOne({ id: user_id });

    if (task.animal.volunteer_id !== user_id) {
      if (user.type !== UserType.ADMIN) {
        throw new Error("Not Authorized");
      }
    }

    if (done) {
      task.done = true;
      task.done_at = parse(
        Date.now().toString(),
        "yyyy-MM-dd kk:mm:ss",
        new Date()
      );

      const updatedTask = await tasksRepository.save(task);
      return updatedTask;
    }
    task.done = false;
    task.done_at = null;

    const updatedTask = await tasksRepository.save(task);

    return updatedTask;
  }
}

export { DoneOrUndoneTaskService };
