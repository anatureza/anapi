import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterColumnQuestion1626869782450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "questions",
      "question",
      new TableColumn({ name: "question_title", type: "text" })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("questions", "question_title");
  }
}
