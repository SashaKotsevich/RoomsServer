import { JwtGuard } from './../auth/guards/jwt-auth.guard';
import { AuthedRequest } from 'src/_common/interfaces/authenticated-request.interface';
import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ResGetMeDTO } from './dto/get-me.dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@Req() req: AuthedRequest): Promise<ResGetMeDTO> {
    const user = await this.usersService.findOne(req.user.id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Get('all')
  async getAll() {
    return await this.usersService.findAll();
  }
}
