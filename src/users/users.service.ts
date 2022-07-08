import { JwtGuard } from './../auth/guards/jwt-auth.guard';
import { ReqRegisterDTO } from './../auth/dto/register.dto';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@UseGuards(JwtGuard)
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userData: ReqRegisterDTO): Promise<User> {
    return this.usersRepository.save(plainToInstance(User, userData));
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[] | null> {
    return this.usersRepository.findBy({});
  }
}
