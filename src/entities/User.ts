import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Address } from "./Address";

@Entity("users")
class User {
  @PrimaryColumn({ type: "uuid" })
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  phone_number: number;

  @Column({ type: "uuid" })
  address_id: string;
  @JoinColumn({ name: "address_id" })
  @OneToOne(() => Address)
  address: Address;

  @Column()
  birth_date: Date;

  @Column()
  admin: boolean;

  @Column()
  authorizes_image: boolean;

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

export { User };
