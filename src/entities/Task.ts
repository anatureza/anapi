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
import { Animal } from "./Animal";

@Entity("tasks")
class Task {
  @PrimaryColumn({ type: "uuid" })
  readonly id: string;

  @Column({ type: "uuid" })
  animal_id: string;
  @JoinColumn({ name: "animal_id" })
  @ManyToOne(() => Animal)
  animal: Animal;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  expected_at: Date;

  @Column({ default: "false" })
  done: boolean;

  @Column({ nullable: true })
  done_at: Date;

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

export { Task };
