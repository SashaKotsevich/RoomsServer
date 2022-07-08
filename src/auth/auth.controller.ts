import { ReqRegisterDTO, ResRegisterDTO } from './dto/register.dto';
import { LocalGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthedRequest } from 'src/_common/interfaces/authenticated-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: ReqRegisterDTO): Promise<ResRegisterDTO> {
    return await this.authService.register(userData);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: AuthedRequest<User>) {
    return this.authService.login(req.user);
  }
}
