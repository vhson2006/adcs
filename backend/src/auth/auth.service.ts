import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { Account } from 'src/entities/account.entity';
import { LoginAccountDto } from 'src/auth/dto/login-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/crypto/crypto.service';
import { EmailService } from 'src/email/email.service';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
export interface JwtPayload {
  username: string;
  sub: string;
  session: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly emailService: EmailService
  ) {}

  async login(loginAccountDto: LoginAccountDto) {
    const { email, password } = loginAccountDto;
    const account = await this.accountRepository.findOne({
      where: {
        email: email,
        password: this.cryptoService.hashPassword(password),
      },
    });
    if (account) {
      const payload: JwtPayload = {
        username: account.email,
        sub: account.id,
        session: account.webSession + 1,
      };
      await this.accountRepository.update(account.id, {
        webSession: account.webSession + 1,
      });

      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    return INCORRECT;
  }

  async logout(id: string) {
    const account = await this.accountRepository.findOne({ id: id });
    const response = await this.accountRepository.update(id, {
      webSession: account.webSession + 1,
    });
    if (response.affected > 0) {
      return CORRECT;
    }
    return INCORRECT;
  }

  async requestResetPassword(requestResetPassword) {
    const { email } = requestResetPassword;
    const account = await this.accountRepository.findOne({ email: email });
    if (account) {
      const forgotPasswordCode = this.cryptoService.generateUniqueCode();
      await this.accountRepository.update(account.id, {
        forgotToken: forgotPasswordCode
      });
      await this.emailService.send({
        code: forgotPasswordCode,
        email: email
      });

      return CORRECT;
    }

    return INCORRECT;
  }
  
  async validateResetPasswordRequest(code) {
    const account = await this.accountRepository.findOne({ forgotToken: code });
    if (account) {
      const resetTokenCode = this.cryptoService.generateUniqueCode();
      await this.accountRepository.update(account.id, {
        resetToken: resetTokenCode
      });
      return {
        status: CORRECT,
        data: resetTokenCode
      };
    }

    return INCORRECT;
  }
  
  async resetPassword(resetPasswordDto) {
    const { password, resetToken } = resetPasswordDto;
    const account = await this.accountRepository.findOne({ resetToken: resetToken });
    if (account) {
      await this.accountRepository.update(account.id, {
        forgotToken: this.cryptoService.generateUniqueCode(),
        resetToken: this.cryptoService.generateUniqueCode(),
        password: crypto.createHash('md5').update(password).digest('hex'),
      });

      return CORRECT;
    }

    return INCORRECT;
  }
}
