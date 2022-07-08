import { AuthedRequest } from 'src/_common/interfaces/authenticated-request.interface';
import { ReqCreateRoomDTO, ResCreateRoomDTO } from './dto/create-room.dto';
import { JwtGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomDTO } from './dto/room.dto';

@UseGuards(JwtGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(
    @Body() roomData: ReqCreateRoomDTO,
    @Req() req: AuthedRequest,
  ): Promise<ResCreateRoomDTO> {
    try {
      return await this.roomsService.createRoom(roomData, req.user.id);
    } catch (err) {
      console.log('here');
      console.log(err);
      throw err;
    }
  }

  @Get('all')
  async getAll(): Promise<RoomDTO[]> {
    return await this.roomsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.roomsService.findOne(Number(id));
  }

  @Post(':id/add-user')
  async addUserToRoom(
    @Param('id') roomId: string,
    @Body('userId') userId: number,
  ): Promise<void> {
    await this.roomsService.addUserToRoom(Number(roomId), userId);
  }

  @Post(':id/join')
  async joinRoom(
    @Param('id') roomId: string,
    @Req() { user }: AuthedRequest,
  ): Promise<void> {
    await this.roomsService.addUserToRoom(Number(roomId), user.id);
  }
}
