import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAdoptionQuiz1628507611507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reservations_quiz",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "first",
            type: "text",
          },
          {
            name: "second",
            type: "text",
          },
          {
            name: "third",
            type: "text",
          },
          {
            name: "fourth",
            type: "text",
          },
          {
            name: "fifth",
            type: "text",
          },
          {
            name: "sixth",
            type: "text",
          },
          {
            name: "seventh",
            type: "text",
          },
          {
            name: "eighth",
            type: "text",
          },
          {
            name: "ninth",
            type: "text",
          },
          {
            name: "tenth",
            type: "text",
          },
          {
            name: "eleventh",
            type: "text",
          },
          {
            name: "twelfth",
            type: "text",
          },
          {
            name: "thirteenth",
            type: "text",
          },
          {
            name: "fourteenth",
            type: "text",
          },
          {
            name: "fifteenth",
            type: "text",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reservations_quiz");
  }
}
