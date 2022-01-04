import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ description: 'email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'name' })
  @IsString()
  @MinLength(4)
  readonly name: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  @MinLength(10)
  readonly password: string;

  @ApiProperty({ description: 'address' })
  @IsString()
  readonly address: string;

  @ApiProperty({ description: 'phone' })
  @IsString()
  readonly phone: string;
}
