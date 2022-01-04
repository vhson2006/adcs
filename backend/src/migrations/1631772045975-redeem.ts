import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Redeem1631772045975 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'redeem',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'accountId',
            type: 'varchar',
          },
          {
            name: 'redeemCode',
            type: 'varchar',
          },
          {
            name: 'fromFirstName',
            type: 'varchar',
          },
          {
            name: 'fromLastName',
            type: 'varchar',
          },
          {
            name: 'toFirstName',
            type: 'varchar',
          },
          {
            name: 'toLastName',
            type: 'varchar',
          },
          {
            name: 'toPhone',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'int',
            default: 0
          },
          {
            name: 'updated',
            type: 'timestamptz',
            default: 'now()'
          },
          {
            name: 'created',
            type: 'timestamptz',
            default: 'now()'
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true
          }
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('redeem');
  }
}
