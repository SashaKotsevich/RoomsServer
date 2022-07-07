import { ResLoginDTO } from './dto/login.dto';
import { ReqRegisterDTO, ResRegisterDTO } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { JWTPayload } from 'src/_common/types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await (await user).checkPassword(password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async register(userData: ReqRegisterDTO): Promise<ResRegisterDTO> {
    try {
      const user = await this.usersService.create(userData);
      delete user.password;
      return {
        user,
        access_token: await this.generateJwt({
          email: user.email,
          id: user.id,
        }),
      };
    } catch (err) {
      throw new ConflictException('User with this email is already exists');
    }
  }

  async login(user: User): Promise<ResLoginDTO> {
    return {
      user,
      access_token: await this.generateJwt({ email: user.email, id: user.id }),
    };
  }

  async generateJwt(payload: JWTPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
