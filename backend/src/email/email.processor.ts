import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { resetPasswordtresetPasTemplate } from './template/reset-password';

@Processor('adc_email')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  private readonly mailer;
  constructor(private readonly configService: ConfigService) {
    this.mailer = nodemailer.createTransport({
      service: this.configService.get('email.type'),
      auth: {
        user: this.configService.get('email.sender'),
        pass: this.configService.get('email.password')
      }
    })
  }

  @Process('adc_email')
  async handleRegister(job: Job) {
    try {
      const { data } = job;
      this.logger.debug(`Start send email: ${JSON.stringify(data)}`);
      const mailer = this.mailer;
      const sender = this.configService.get('email.sender');
      const { code, email } = data
      let mailOptions = {
        from: sender,
        to: email,
        subject: "Alternative Dairy Co",
        html: resetPasswordtresetPasTemplate.replace(
          '%%link%%', 
          `https://shoutamatethealternative.com.au/reset-password/${code}`
        ),
      };
      mailer.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      this.logger.debug(`Send email completed: ${JSON.stringify(data)}`);
    } catch(err) {
      this.logger.debug(`Send email error: ${JSON.stringify(err)}`);
    }
  }
}
