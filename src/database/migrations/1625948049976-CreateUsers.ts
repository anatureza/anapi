import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1625948049976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "phone_number",
            type: "varchar",
            isUnique: true,
            length: "11",
          },
          {
            name: "address_id",
            type: "uuid",
            isUnique: true,
          },
          {
            name: "birth_date",
            type: "date",
          },
          {
            name: "type",
            type: "enum",
          },
          {
            name: "authorizes_image",
            type: "boolean",
            default: false,
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
    await queryRunner.dropTable("users");
  }
}
