import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from 'src/crypto/crypto.service';
import { Account } from 'src/entities/account.entity';
import { Redeem } from 'src/entities/redeem.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Redeem]),
  ],
  controllers: [AccountController],
  providers: [AccountService, CryptoService],
  exports: [AccountService],
})
export class AccountModule {}
