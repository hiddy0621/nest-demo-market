import { ItemStatus } from '../items/item.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  // User とのリレーション
  // アイテムはひとりのユーザーに結びつけられるので 多対1
  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column()
  userId: string;
}
