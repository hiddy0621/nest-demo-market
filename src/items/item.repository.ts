import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item.model';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const { name, price, description } = createItemDto;
    // Repositry クラスが持つ create メソッドを利用
    const item = this.create({
      // UUID を利用するので ID は不要
      name,
      price,
      description,
      status: 'ON_SALE' as ItemStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
    });

    // データベースに Item を保存する
    // Repositry クラスの save メソッドを非同期で使う
    await this.save(item);

    return item;
  }
}
