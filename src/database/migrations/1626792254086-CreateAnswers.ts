import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnswers1626792254086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "answers",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "reservation_id",
            type: "uuid",
            isUnique: false,
          },
          {
            name: "question_order",
            type: "integer",
            isUnique: false,
          },
          {
            name: "answer",
            type: "text",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKAnswersReservationId",
            referencedTableName: "reservations",
            referencedColumnNames: ["id"],
            columnNames: ["reservation_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKQuestionOrder",
            referencedTableName: "questions",
            referencedColumnNames: ["order"],
            columnNames: ["question_order"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("answers");
  }
}
