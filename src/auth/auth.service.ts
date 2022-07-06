import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { ConflictException, Injectable } from '@nestjs/common';

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

  async register(
    userData: CreateUserDto,
  ): Promise<{ user: User; access_token: string }> {
    try {
      const user = await this.usersService.create(userData);
      const jwtPayload = { email: user.email, sub: user.id };
      delete user.password;
      return {
        user,
        access_token: await this.jwtService.signAsync(jwtPayload),
      };
    } catch (err) {
      throw new ConflictException('User with this email is already exists');
    }
  }

  async login(user: User): Promise<{ user: User; access_token: string }> {
    const jwtPayload = { email: user.email, sub: user.id };
    return { user, access_token: await this.jwtService.signAsync(jwtPayload) };
  }
}
