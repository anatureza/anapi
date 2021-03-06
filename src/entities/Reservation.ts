import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ReservationQuiz } from "./ReservationQuiz";
import { Animal } from "./Animal";
import { User } from "./User";
import { Expose } from "class-transformer";

export enum ReservationStatus {
  NEW = "new",
  APPROVED = "approved",
  DISAPPROVED = "disapproved",
  ADOPTED = "adopted",
}

@Entity("reservations")
class Reservation {
  @PrimaryColumn({ type: "uuid" })
  readonly id: string;

  @Expose({ name: "volunteer_id" })
  getVolunteerId(): string {
    return `${this.animal.volunteer_id}`;
  }

  @Column({ type: "uuid" })
  adopter_id: string;
  @JoinColumn({ name: "adopter_id" })
  @ManyToOne(() => User)
  userAdopter: User;

  @Column({ type: "uuid" })
  animal_id: string;
  @JoinColumn({ name: "animal_id" })
  @ManyToOne(() => Animal)
  animal: Animal;

  @Column({
    type: "enum",
    enum: ReservationStatus,
    nullable: false,
    default: ReservationStatus.NEW,
  })
  status: ReservationStatus;

  @Column({ type: "uuid" })
  quiz_id: string;
  @OneToOne(() => ReservationQuiz)
  @JoinColumn({ name: "quiz_id" })
  quiz: ReservationQuiz;

  @Column({ nullable: true })
  scheduled_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Reservation };
