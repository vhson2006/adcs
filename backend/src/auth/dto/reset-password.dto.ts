import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'password' })
  @Allow()
  readonly password: string;

  @ApiProperty({ description: 'resetToken' })
  @Allow()
  readonly resetToken: string;
}
