import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Repository } from 'typeorm';
import { UpdateAccountDto } from './dto/update-account-dto';
import { LIMIT_STATUS, WARNING_STATUS, PROCESS_STATUS } from './account.constant';
import { CORRECT, INCORRECT } from 'src/config/app.constant';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async detail(id: string) {
    const account = await this.accountRepository.findOne({
      where: {
        id: id,
      },
    });
    if (account) {
      return account;
    }
    return INCORRECT;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const response = await this.accountRepository.update(id, updateAccountDto);
    if (response.affected > 0) {
      return CORRECT;
    }
    return INCORRECT;
  }

  async checkCode(code: string) {
    const account = await this.accountRepository.findOne({
      where: {
        code: code
      }
    });

    if (account === undefined) {
      return INCORRECT;
    }
    const { activedQuantity } = account;
    if (activedQuantity >= account.codeNumberLimit) {
      return LIMIT_STATUS;
    } else {
      if (activedQuantity >= account.codeNumberWarning) {
        return WARNING_STATUS;
      } else {
        return PROCESS_STATUS;
      }
    }
  }

  async list() {
    return await this.accountRepository.find();
  }
}
