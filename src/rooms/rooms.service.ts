import { plainToInstance } from 'class-transformer';
import { ReqCreateRoomDTO } from './dto/create-room.dto';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/rooms.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
  ) {}

  async createRoom(
    roomData: ReqCreateRoomDTO,
    authorId: number,
  ): Promise<Room> {
    return await this.roomsRepository.save(
      plainToInstance(Room, {
        ...roomData,
        author: { id: authorId },
        users: [{ id: authorId }],
      }),
    );
  }

  async findAll(): Promise<Room[]> {
    return await this.roomsRepository.findBy({});
  }

  async findOne(id: number): Promise<Room> {
    return await this.roomsRepository.findOneBy({ id });
  }

  async addUserToRoom(roomId: number, userId: number): Promise<void> {
    const room = await this.roomsRepository.findOne({
      where: { id: roomId },
      relations: { users: true },
    });

    const alreadyExist = !!room.users.find((user) => user.id === userId);
    if (alreadyExist) {
      throw new ConflictException('user is already exist in this room');
    }

    room.users.push({ id: userId } as User);
    await this.roomsRepository.save(room);
  }
}
