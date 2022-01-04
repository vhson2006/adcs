import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class RequestResetPasswordDto {
  @ApiProperty({ description: 'email' })
  @Allow()
  readonly email: string;
}
