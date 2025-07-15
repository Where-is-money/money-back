import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminUsersService } from '../applications/admin-users.service';

@ApiTags('users')
@Controller('admins/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Post()
  async create() {
    return this.adminUsersService.register();
  }
}
