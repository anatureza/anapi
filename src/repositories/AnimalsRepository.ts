import { EntityRepository, Repository } from "typeorm";
import { Animal } from "../entities/Animal";

@EntityRepository(Animal)
class AnimalsRepository extends Repository<Animal> {}

export { AnimalsRepository };
