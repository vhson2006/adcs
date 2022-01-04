import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from 'bull';

@Injectable()
export class SmsService {
  constructor(
    @InjectQueue('adc_sms')
    private readonly smsQueue: Queue
  ) {}

  async send(smsData) {
    return await this.smsQueue.add('adc_sms', smsData);
  }
}
