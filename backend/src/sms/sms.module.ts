import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SmsService } from './sms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsProcessor } from './sms.processor';
import { Redeem } from 'src/entities/redeem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Redeem]),
    BullModule.registerQueue({
      name: 'adc_sms',
    })
  ],
  providers: [SmsService, SmsProcessor],
  exports: [SmsService],
})
export class SmsModule {}
