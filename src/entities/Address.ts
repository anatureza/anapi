import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("addresses")
class Address {
  @PrimaryColumn({ type: "uuid" })
  readonly id: string;

  @Column()
  place: string;

  @Column({ length: "10" })
  number: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column({ length: "8" })
  zip: string;

  @Column()
  city: string;

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

export { Address };
