import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { CryptoService } from 'src/crypto/crypto.service';
import { EmailService } from 'src/email/email.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Account]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
          algorithm: configService.get('jwt.algorithm'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'adc_email',
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CryptoService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}
