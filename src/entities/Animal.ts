import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Expose } from "class-transformer";
import { v4 as uuid } from "uuid";
import { config } from "dotenv";

import { Address } from "./Address";
import { Image } from "./Image";
import { User } from "./User";

config();

export enum AnimalKind {
  CAT = "cat",
  DOG = "dog",
  NONE = "none",
}

export enum AnimalGender {
  MALE = "male",
  FEMALE = "female",
  NONE = "none",
}

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

  @Column({
    type: "enum",
    enum: AnimalKind,
    nullable: false,
    default: AnimalKind.NONE,
  })
  kind!: AnimalKind;

  @Column({
    type: "enum",
    enum: AnimalGender,
    nullable: false,
    default: AnimalGender.NONE,
  })
  gender: AnimalGender;

  @Column()
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Image, (image) => image.animal, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "animal_id" })
  images: Image[];

  @Expose({ name: "main_image_url" })
  getAvatarURL(): string | null {
    if (!this.images) {
      return null;
    }

    const [main_image] = this.images;

    return `${process.env.APP_API_URL}/uploads/${main_image.path}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Animal };
