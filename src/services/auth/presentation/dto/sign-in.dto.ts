import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ description: 'Email', example: 'test@admin.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Password', example: 'dkssudgktpdy11123@' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
