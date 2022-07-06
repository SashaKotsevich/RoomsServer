import { CreateUserDto } from './../users/dto/create-user.dto';
import { LocalGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return await this.authService.register(userData);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }
}
