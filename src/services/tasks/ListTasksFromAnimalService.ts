import { getCustomRepository } from "typeorm";

import { TasksRepository } from "../../repositories/TasksRepository";

interface ITaskRequest {
  animal_id: string;
}

class ListTasksFromAnimalService {
  async execute({ animal_id }: ITaskRequest) {
    const tasksRepository = getCustomRepository(TasksRepository);

    const tasks = await tasksRepository.find({ animal_id });

    return tasks;
  }
}

export { ListTasksFromAnimalService };
