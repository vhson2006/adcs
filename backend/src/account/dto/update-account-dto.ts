import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'email' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'address' })
  @IsString()
  readonly address: string;

  @ApiProperty({ description: 'phone' })
  @IsString()
  readonly phone: string;
}
