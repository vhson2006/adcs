import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Account } from 'src/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Redeem } from 'src/entities/redeem.entity';
import { CryptoService } from 'src/crypto/crypto.service';
import { SmsService } from 'src/sms/sms.service';
import { LIMIT, LIMIT_STATUS, WARNING_LIMIT, PROCESS_STATUS } from '../account/account.constant';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
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
    if (account && account.activedQuantity < LIMIT) {
      const redeemCode = this.cryptoService.generateSixCode();
      await this.accountRepository.update(account.id, {
        invitedQuantity: account.invitedQuantity + 1,
      });
      await this.redeemRepository.insert({
        ...redeemData,
        accountId: account.id,
        redeemCode: redeemCode
      });

      let template = 'You have just received a FREE COFFEE from %s %s. You can redeem this at: %s, %s. Present this code to the barista to claim %s';
      // this.smsService.send({
      //   message: template
      //     .replace('%s', redeemData.fromFirstName)
      //     .replace('%s', redeemData.fromLastName)
      //     .replace('%s', account.name)
      //     .replace('%s', account.address)
      //     .replace('%s', redeemCode),
      //   phone: redeemData.toPhone
      // })
      return CORRECT;
    }

    return INCORRECT;
  }

  async claim(id: string, claimDto) {
    const { redeemCode } = claimDto;
    const account = await this.accountRepository.findOne(id);
    if (account) {
      if (account.activedQuantity < LIMIT) {
        const redeemData = await this.redeemRepository.findOne({
          where: {
            accountId: id,
            redeemCode: redeemCode,
            status: 0
          }
        });
        if (redeemData) {
          await this.accountRepository.update(id, {
            activedQuantity: account.activedQuantity + 1,
          });
          await this.redeemRepository.update(redeemData.id, { status: 1 });
          if (account.activedQuantity >= WARNING_LIMIT && account.activedQuantity < LIMIT) {
            this.smsService.send({
              message: 'The campaign code is claimed %s times'.replace('%s', WARNING_LIMIT.toString()),
              phone: account.phone
            });
          }
          if (account.activedQuantity >= LIMIT) {
            this.smsService.send({
              message: 'The campaign code reach out %s times (maximun)'.replace('%s', LIMIT.toString()),
              phone: account.phone
            });
            //send email attached csv also here
          }

          this.smsService.send({
            message: 'Thank you for redeeming your free coffee, let us know how you liked it here: http://bitly.com....',
            phone: redeemData.toPhone
          });

          return PROCESS_STATUS;
        }
        
        return INCORRECT;
      } else {
        return LIMIT_STATUS;
      }
    }

    return INCORRECT;
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
    const redeem = await this.redeemRepository.findOne({
      where: {
        accountId: userId,
        id: redeemId
      }
    });
    if (redeem) {
      const response = await this.redeemRepository.delete(redeemId);
      if (response.affected > 0) {
        return CORRECT;
      }
    }

    return INCORRECT;
  }
}
