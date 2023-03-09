import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true }) // セキュリティのためにパスワードをレスポンスから外す
  password: string;

  @Column()
  status: string;

  // Item とのリレーション
  // ユーザーは複数のアイテムを持てるので, 1対多 になる
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
