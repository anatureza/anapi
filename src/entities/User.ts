import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { v4 as uuid } from "uuid";
import { config } from "dotenv";

import { Address } from "./Address";

config();

export enum UserType {
  ADMIN = "admin",
  VOLUNTEER = "volunteer",
  USER = "user",
}

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

  @Column({ length: "11" })
  phone_number: string;

  @Column({ type: "uuid" })
  address_id: string;
  @JoinColumn({ name: "address_id" })
  @OneToOne(() => Address, { cascade: ["update", "remove"] })
  address: Address;

  @Column({ type: "date" })
  birth_date: Date;

  @Column({
    type: "enum",
    enum: UserType,
    nullable: false,
    default: UserType.USER,
  })
  type: UserType;

  @Column()
  authorizes_image: boolean;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "avatar_url" })
  getAvatarURL(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.APP_API_URL}/uploads/${this.avatar}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
