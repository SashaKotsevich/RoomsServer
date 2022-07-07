import { Controller, Get } from '@nestjs/common';
import { ResGetMeDTO } from './dto/get-me.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(): Promise<ResGetMeDTO> {
    return;
  }
}
