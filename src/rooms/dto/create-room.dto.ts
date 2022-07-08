import { IsNotEmpty, IsOptional } from 'class-validator';

export class ReqCreateRoomDTO {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  isPublic?: boolean;
}

export class ResCreateRoomDTO extends ReqCreateRoomDTO {
  id: number;
}
