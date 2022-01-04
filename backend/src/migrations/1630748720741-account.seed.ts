import { MigrationInterface, QueryRunner, Brackets } from "typeorm";
import * as crypto from 'crypto';
import data from './data/development';
import { Account } from "src/entities/account.entity";

export class AccountSeed1630748720741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const insertValues = await data().account.map((element) => {
      return {
        ...element,
        password: crypto.createHash('md5').update(element.password).digest('hex'),
      }
    });
    
    await queryRunner.connection.createQueryBuilder()
      .insert()
      .into(Account)
      .values(insertValues)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let emails = [];
    data().account.forEach((element) => emails.push(element.email));
    await queryRunner.connection.createQueryBuilder()
      .delete()
      .from(Account, "account")
      .where('account.email IN (:...emails)', { emails: emails })
      .execute();
  }
}
