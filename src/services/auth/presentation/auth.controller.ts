import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../applications/auth.service';
import { SignInDto, SignInResponseDto } from './dto';
import { ApiStandardResponse } from '@libs/decorators';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@libs/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiStandardResponse({ type: SignInResponseDto, status: HttpStatus.OK })
  async signIn(@Body() body: SignInDto) {
    const data = await this.authService.signIn(body);

    return data;
  }
}
