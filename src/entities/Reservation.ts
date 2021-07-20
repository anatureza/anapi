import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Animal } from "./Animal";
import { Answer } from "./Answer";
import { User } from "./User";

@Entity("reservations")
class Reservation {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  adopter_id: string;
  @JoinColumn({ name: "adopter_id" })
  @ManyToOne(() => User)
  userAdopter: User;

  @Column()
  volunteer_id: string;
  @JoinColumn({ name: "volunteer_id" })
  @ManyToOne(() => User)
  userVolunteer: User;

  @Column()
  animal_id: string;
  @JoinColumn({ name: "animal_id" })
  @ManyToOne(() => Animal)
  animal: Animal;

  @OneToMany(() => Answer, (answer) => answer.reservation)
  answers: Answer[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Reservation };
