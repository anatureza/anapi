import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddReservationQuizId1628510438744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "reservations",
      new TableColumn({
        name: "quiz_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "reservations",
      new TableForeignKey({
        name: "FKReservationQuizId",
        referencedTableName: "reservations_quiz",
        referencedColumnNames: ["id"],
        columnNames: ["quiz_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("reservations", "FKReservationQuizId");
    await queryRunner.dropColumn("reservations", "quiz_id");
  }
}
