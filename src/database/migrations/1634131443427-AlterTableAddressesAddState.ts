import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableAddressesAddState1634131443427
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "addresses",
      new TableColumn({
        name: "uf",
        type: "enum",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("addresses", "uf");
  }
}
