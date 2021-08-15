import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateImages1628893961654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "animal_id",
            type: "uuid",
          },
        ],

        foreignKeys: [
          {
            name: "FKAnimalImage",
            columnNames: ["animal_id"],
            referencedTableName: "animals",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images");
  }
}
