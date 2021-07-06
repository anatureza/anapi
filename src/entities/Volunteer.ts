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

@Entity("volunteer")
class Volunteer {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  admin: boolean;

  @Column()
  address_id: string;
  @JoinColumn({ name: "address_id" })
  @OneToOne(() => Address)
  address: Address;

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

export { Volunteer };
