import { EntityRepository, Repository } from "typeorm";
import { Task } from "../entities/Task";

@EntityRepository(Task)
class TasksRepository extends Repository<Task> {}

export { TasksRepository };
