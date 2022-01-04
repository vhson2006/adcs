import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from 'bull';
import { CORRECT } from "src/config/app.constant";

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('adc_email')
    private readonly emailQueue: Queue
  ) {}

  async send(emailData) {
    await this.emailQueue.add('adc_email', emailData);
    return CORRECT;
  }
}
