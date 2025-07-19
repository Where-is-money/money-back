import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminUsersService } from '../applications/admin-users.service';
import { UserCreateDto } from './dto';

@ApiTags('Users')
@Controller('admins/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Post()
  async create(@Body() body: UserCreateDto) {
    await this.adminUsersService.register(body);

    return { data: {} };
  }

  @Get()
  @ApiBearerAuth('token')
  async list() {
    const data = await this.adminUsersService.list();

    return { data };
  }
}
