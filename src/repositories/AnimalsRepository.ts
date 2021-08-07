import { EntityRepository, Repository } from "typeorm";
import { Animal } from "../entities/Animal";

@EntityRepository(Animal)
class AnimalsRepository extends Repository<Animal> {
  public async findByIdAndVolunteerId({
    id,
    volunteer_id,
  }): Promise<Animal | undefined> {
    const animal = await this.findOne({
      where: {
        id,
        volunteer_id,
      },
    });

    return animal;
  }
}

export { AnimalsRepository };
