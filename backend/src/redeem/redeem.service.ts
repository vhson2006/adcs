import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Account } from 'src/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Redeem } from 'src/entities/redeem.entity';
import { CryptoService } from 'src/crypto/crypto.service';
import { SmsService } from 'src/sms/sms.service';
import { LIMIT_STATUS, PROCESS_STATUS } from '../account/account.constant';
import { ACTIVED_REDEEM, CORRECT, INCORRECT, UNUSED_REDEEM } from 'src/config/app.constant';
import { tranformRedeems } from './redeem.transformer';

@Injectable()
export class RedeemService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Redeem)
    private readonly redeemRepository: Repository<Redeem>,
    private readonly cryptoService: CryptoService,
    private readonly smsService: SmsService
  ) {}

  async invite(inviteDto) {
    const { code, ...redeemData } = inviteDto;
    const account = await this.accountRepository.findOne({
      where: {
        code: code
      }
    });
    if (account === undefined || account.activedQuantity >= account.codeNumberLimit) {
      return INCORRECT;
    }
    const redeemCode = this.cryptoService.generateSixCode();
    await this.accountRepository.update(account.id, {
      invitedQuantity: account.invitedQuantity + 1,
    });
    await this.redeemRepository.insert({
      ...redeemData,
      accountId: account.id,
      redeemCode: redeemCode
    });

    let template = 'You have just received a FREE BREW with The Alternative Almond Milk from %s %s. You can redeem this at: %s, %s. Present this code to the barista to claim %s';
    await this.smsService.send({
      message: template
        .replace('%s', redeemData.fromFirstName)
        .replace('%s', redeemData.fromLastName)
        .replace('%s', account.name)
        .replace('%s', account.address)
        .replace('%s', redeemCode),
      phone: redeemData.toPhone
    })
    return CORRECT;
  }

  async claim(id: string, claimDto) {
    const { redeemCode } = claimDto;
    const account = await this.accountRepository.findOne(id);
    if (account === undefined) {
      return INCORRECT;
    }
    if (account.activedQuantity >= account.codeNumberLimit) {
      return LIMIT_STATUS;
    }
    const redeemData = await this.redeemRepository.findOne({
      where: {
        accountId: id,
        redeemCode: redeemCode,
        status: UNUSED_REDEEM
      }
    });
    if (redeemData === undefined) {
      return INCORRECT;
    }

    await this.accountRepository.update(id, {
      activedQuantity: account.activedQuantity + 1,
    });
    await this.redeemRepository.update(redeemData.id, { status: ACTIVED_REDEEM });
    await this.smsService.send({
      message: 'Thank you for redeeming your free brew, let us know how you liked it here: http://bitly.com....',
      phone: redeemData.toPhone
    });

    if ((account.activedQuantity + 1) == account.codeNumberWarning 
      && (account.activedQuantity + 1) < account.codeNumberLimit) {
        await this.smsService.send({
        message: 'The campaign code is claimed %s times'.replace('%s', account.codeNumberWarning.toString()),
        phone: account.phone
      });
    }
    if ((account.activedQuantity + 1) >= account.codeNumberLimit) {
      await this.smsService.send({
        message: 'The campaign code reached out %s times (maximum)'.replace('%s', account.codeNumberLimit.toString()),
        phone: account.phone
      });
    }

    return PROCESS_STATUS;
  }

  async getList(user, query) {
    const { search, page, size } = query;
    const response = await this.redeemRepository.findAndCount({
      order: {
        created: 'DESC',
      },
      where: [
        {accountId: user, toLastName: Like(`%${search}%`)},
        {accountId: user, toFirstName: Like(`%${search}%`)},
        {accountId: user, fromLastName: Like(`%${search}%`)},
        {accountId: user, fromFirstName: Like(`%${search}%`)},
        {accountId: user, toPhone: Like(`%${search}%`)},
      ],
      skip: size * (page - 1),
      take: size
    });

    if (response) {
      return {
        search: search,
        page: page,
        size: size,
        totalPage: Math.ceil(response[1] / size),
        totalRedeem: response[1],
        data: response[0].map(tranformRedeems),
      };
    }

    return {
      search: search,
      page: 1,
      size: size,
      totalPage: 1,
      totalRedeem: 0,
      data: [],
    };
  }

  async updateRedeem(userId, redeemId, redeemData) {
    const redeem = await this.redeemRepository.findOne({
      where: {
        accountId: userId,
        id: redeemId
      }
    });

    if (redeem) {
      const response = await this.redeemRepository.update(redeemId, redeemData);
      if (response.affected > 0) {
        return CORRECT;
      }
    }
    
    return INCORRECT;
  }

  async deleteRedeem(userId, redeemId) {
    const account = await this.accountRepository.findOne(userId);
    if (account === undefined) {
      return INCORRECT;
    }
    const redeem = await this.redeemRepository.findOne({
      where: {
        accountId: userId,
        id: redeemId
      }
    });
    if (redeem === undefined) {
      return INCORRECT;
    }
    await this.redeemRepository.softDelete(redeemId);
    await this.accountRepository.update(userId, {
      activedQuantity: account.activedQuantity - (redeem.status === ACTIVED_REDEEM ? 1 : 0),
      invitedQuantity: account.invitedQuantity - 1,
    });
    
    return CORRECT;
  }
}
