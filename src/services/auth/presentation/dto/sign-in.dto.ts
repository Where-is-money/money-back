import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ description: 'Email', example: 'theo@gmail.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Password', example: 'theo@1234' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
