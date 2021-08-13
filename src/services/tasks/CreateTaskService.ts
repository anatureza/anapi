import { getCustomRepository } from "typeorm";

import { TasksRepository } from "../../repositories/TasksRepository";
import { AnimalsRepository } from "../../repositories/AnimalsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UserType } from "../../entities/User";

interface ITaskRequest {
  user_id: string;
  animal_id: string;
  title: string;
  description?: string;
  expected_at?: Date;
}

class CreateTaskService {
  async execute({
    user_id,
    animal_id,
    title,
    description,
    expected_at,
  }: ITaskRequest) {
    const tasksRepository = getCustomRepository(TasksRepository);
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const animal = await animalsRepository.findOne(animal_id);

    if (!animal) {
      throw new Error("Animal Does Not Exist");
    }

    const user = await usersRepository.findOne(user_id);

    if (animal.volunteer_id !== user_id) {
      if (user.type !== UserType.ADMIN) {
        throw new Error("Not Authorized");
      }
    }

    try {
      const task = tasksRepository.create({
        title,
        animal_id,
        description,
        expected_at,
      });

      await tasksRepository.save(task);

      return task;
    } catch (error) {
      throw new Error(`Task Could Not Be Created (${error})`);
    }
  }
}

export { CreateTaskService };
