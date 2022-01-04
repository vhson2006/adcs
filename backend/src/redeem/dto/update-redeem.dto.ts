import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class UpdateRedeemDto {
  @ApiProperty({ description: 'fromFirstname' })
  @Allow()
  readonly fromFirstName: string;

  @ApiProperty({ description: 'fromLastname' })
  @Allow()
  readonly fromLastName: string;

  @ApiProperty({ description: 'toFirstname' })
  @Allow()
  readonly toFirstName: string;

  @ApiProperty({ description: 'toLastname' })
  @Allow()
  readonly toLastName: string;

  @ApiProperty({ description: 'toPhone' })
  @Allow()
  readonly toPhone: string;
}
