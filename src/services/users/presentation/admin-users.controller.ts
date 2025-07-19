import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminUsersService } from '../applications/admin-users.service';
import { UserCreateDto } from './dto';
import { Roles, Public } from '@libs/decorators';
import { RoleType } from '../../roles/domain/roles.entity';

@ApiTags('Users')
@Controller('admins/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Public()
  @Post()
  async create(@Body() body: UserCreateDto) {
    await this.adminUsersService.register(body);

    return { data: {} };
  }

  @Get()
  @Roles(RoleType.ADMIN)
  @ApiBearerAuth('token')
  async list() {
    const data = await this.adminUsersService.list();

    return { data };
  }
}
