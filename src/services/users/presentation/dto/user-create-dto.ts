import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ description: '이름', example: '홍길동' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: '이메일', example: 'test@admin.com' })
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: '비밀번호는 최소 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.',
    example: 'dkssudgktpdy11123@',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
  password!: string;
}
