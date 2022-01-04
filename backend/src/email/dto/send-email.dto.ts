import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ description: 'email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'code' })
  @IsString()
  readonly code: string;
}
