import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('admins/users')
export class AdminUsersController {
  @Get()
  @ApiOperation({ summary: '유저 목록 조회' })
  async list() {}
}
