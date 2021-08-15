import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Animal } from "./Animal";

@Entity("images")
class Image {
  @PrimaryColumn({ type: "uuid" })
  readonly id: string;

  @Column()
  path: string;

  @Column({ type: "uuid" })
  animal_id: string;
  @ManyToOne(() => Animal, (animal) => animal.images)
  @JoinColumn({ name: "animal_id" })
  animal: Animal;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Image };
