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
            name: "creator_id",
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
            type: "char",
          },
          {
            name: "gender",
            type: "char",
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
            name: "FKCreatorId",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["creator_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKAddressId",
            referencedTableName: "address",
            referencedColumnNames: ["id"],
            columnNames: ["address_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animals");
  }
}
