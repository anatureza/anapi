import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddress1624857791097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "addresses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            // logradouro
            name: "place",
            type: "varchar",
          },
          {
            name: "number",
            type: "integer",
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "neighborhood",
            type: "varchar",
          },
          {
            name: "zip",
            type: "integer",
          },
          {
            name: "city",
            type: "varchar",
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("addresses");
  }
}
