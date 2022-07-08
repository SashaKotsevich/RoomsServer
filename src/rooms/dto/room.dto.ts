export class RoomDTO {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  authorId: number;
  usersIds: number[];
}
