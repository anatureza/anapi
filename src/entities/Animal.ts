import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./Address";
import { User } from "./User";

@Entity("animals")
class Animal {
  @PrimaryColumn({ type: "uuid" })
  readonly id: string;

  @Column({ type: "uuid" })
  volunteer_id: string;
  @JoinColumn({ name: "volunteer_id" })
  @ManyToOne(() => User)
  user: User;

  @Column({ type: "uuid" })
  address_id: string;
  @JoinColumn({ name: "address_id" })
  @OneToOne(() => Address)
  address: Address;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  available: boolean;

  @Column()
  kind: string;

  @Column()
  gender: string;

  @Column()
  birth_date: Date;

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

export { Animal };
