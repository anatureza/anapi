import { EntityRepository, Repository } from "typeorm";
import { Image } from "../entities/Image";

@EntityRepository(Image)
class ImagesRepository extends Repository<Image> {}

export { ImagesRepository };
