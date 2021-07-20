import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReservations1626791589698 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reservations",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "adopter_id",
            type: "uuid",
          },
          {
            name: "volunteer_id",
            type: "uuid",
          },
          {
            name: "animal_id",
            type: "uuid",
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
            name: "FKAdopterId",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["adopter_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKVolunteerId",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["volunteer_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKAnimalId",
            referencedTableName: "animals",
            referencedColumnNames: ["id"],
            columnNames: ["animal_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reservations");
  }
}
