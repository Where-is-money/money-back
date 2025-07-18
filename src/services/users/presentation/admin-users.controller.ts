import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminUsersService } from '../applications/admin-users.service';
import { UserCreateDto } from './dto';

@ApiTags('users')
@Controller('admins/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Post()
  async create(@Body() body: UserCreateDto) {
    await this.adminUsersService.register(body);

    return { data: {} };
  }
}
