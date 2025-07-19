import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    description: 'Access token',
    example: '1234567890',
  })
  accessToken: string;
}
