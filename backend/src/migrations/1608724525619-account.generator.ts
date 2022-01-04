import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class AccountGenerator1608724525619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'contactName',
            type: 'varchar',
          },          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'position',
            type: 'varchar',
          },
          {
            name: 'invitedQuantity',
            type: 'int',
            default: 0
          },
          {
            name: 'activedQuantity',
            type: 'int',
            default: 0
          },
          {
            name: 'forgotToken',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'resetToken',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'webSession',
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

    await queryRunner.createIndex(
      'account',
      new TableIndex({
        name: 'IDX_ACCOUNT_EMAIL',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createIndex(
      'account',
      new TableIndex({
        name: 'IDX_ACCOUNT_CODE',
        columnNames: ['code'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('account', 'IDX_ACCOUNT_CODE');
    await queryRunner.dropIndex('account', 'IDX_ACCOUNT_EMAIL');
    await queryRunner.dropTable('account');
  }
}
