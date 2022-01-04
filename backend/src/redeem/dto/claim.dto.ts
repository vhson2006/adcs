import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class ClaimDto {
  @ApiProperty({ description: 'redeemCode' })
  @Allow()
  readonly redeemCode: string;
}
