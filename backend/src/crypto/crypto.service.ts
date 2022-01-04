import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}
  
  hashPassword(password: string): string {
    return crypto
      .createHash(this.configService.get('password.algorithm'))
      .update(password)
      .digest(this.configService.get('password.digest'));
  }

  generateUniqueCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const current = new Date();
    
    let result = '';
    result += characters.charAt(Math.trunc(current.getFullYear() / charactersLength));
    result += characters.charAt(current.getFullYear() % charactersLength);
    result += characters.charAt(current.getMonth());
    result += characters.charAt(current.getDate());
    result += characters.charAt(current.getHours());
    result += characters.charAt(current.getMinutes());
    result += characters.charAt(current.getSeconds());
    result += characters.charAt(Math.trunc(current.getMilliseconds() / charactersLength));
    result += characters.charAt(current.getMilliseconds() % charactersLength);
    for ( let i = 0; i < 2; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }

  generateSixCode(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
