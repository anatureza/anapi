import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnimals1626024794712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "animals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "volunteer_id",
            type: "uuid",
          },
          {
            name: "address_id",
            type: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "available",
            type: "boolean",
          },
          {
            name: "kind",
            type: "enum",
          },
          {
            name: "gender",
            type: "enum",
          },
          {
            name: "birth_date",
            type: "date",
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
            name: "FKVolunteerId",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["volunteer_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKAddressId",
            referencedTableName: "addresses",
            referencedColumnNames: ["id"],
            columnNames: ["address_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animals");
  }
}
