import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Reservation } from "./Reservation";

@Entity("reservations_quiz")
class ReservationQuiz {
  @PrimaryColumn({ type: "uuid" })
  readonly id: string;

  @Column()
  first: string;

  @Column()
  second: string;

  @Column()
  third: string;

  @Column()
  fourth: string;

  @Column()
  fifth: string;

  @Column()
  sixth: string;

  @Column()
  seventh: string;

  @Column()
  eighth: string;

  @Column()
  ninth: string;

  @Column()
  tenth: string;

  @Column()
  eleventh: string;

  @Column()
  twelfth: string;

  @Column()
  thirteenth: string;

  @Column()
  fourteenth: string;

  @Column()
  fifteenth: string;

  @OneToOne(() => Reservation, (reservation) => reservation.quiz)
  reservation: Reservation;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ReservationQuiz };
