import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailService } from './email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailProcessor } from './email.processor';
import { Redeem } from 'src/entities/redeem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Redeem]),
    BullModule.registerQueue({
      name: 'adc_email',
    })
  ],
  providers: [EmailService, EmailProcessor],
  exports: [EmailService],
})
export class EmailModule {}
