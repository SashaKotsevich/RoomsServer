import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: true })
  isPublic: boolean;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  author: User;

  @RelationId((room: Room) => room.author)
  authorId: number;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  users: User[];

  @RelationId((room: Room) => room.users)
  usersIds: number[];
}
