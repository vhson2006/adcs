import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class LoginAccountDto {
  @ApiProperty({ description: 'email' })
  @Allow()
  readonly email: string;

  @ApiProperty({ description: 'password' })
  @Allow()
  readonly password: string;
}
