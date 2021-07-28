import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Question } from "./Question";
import { Reservation } from "./Reservation";

@Entity("answers")
class Answer {
  @PrimaryColumn({ type: "uuid" })
  readonly id: string;

  @Column({ type: "uuid" })
  reservation_id: string;
  @JoinColumn({ name: "reservation_id" })
  @ManyToOne(() => Reservation)
  reservation: Reservation;

  @Column()
  question_order: number;
  @JoinColumn({ name: "question_order" })
  @ManyToOne(() => Question)
  question: Question;

  @Column()
  answer: string;

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

export { Answer };
