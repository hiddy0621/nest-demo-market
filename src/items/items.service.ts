import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
// Entity から クラスを参照するように
// import { Item } from './item.model';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';
// import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
// import { ItemStatus } from './item.model';

@Injectable()
export class ItemsService {
  // ItemRepositry を DI する
  constructor(private readonly itemRepositry: ItemRepository) {}

  private items: Item[] = [];

  // Item Repository クラスをセットしたら
  // メソッドを適宜書き換える（リポジトリのメソッドを使う）

  async findAll(): Promise<Item[]> {
    return await this.itemRepositry.find();
  }

  // ID から商品を検索する
  async getById(id: string): Promise<Item> {
    const found = await this.itemRepositry.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  // 作成メソッドはリポジトリに移管済み
  // なので、リポジトリからメソッドを呼び出せばOK
  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepositry.createItem(createItemDto);
  }

  // プロパティを書き換えたら、Save
  async updateStatus(id: string): Promise<Item> {
    const item = await this.getById(id);
    // console.log(item);
    if (item) {
      item.status = 'SOLD_OUT';
      item.updatedAt = new Date().toISOString();
      await this.itemRepositry.save(item);
      return item;
    }
  }

  async delete(id: string): Promise<void> {
    await this.itemRepositry.delete({ id });
    return;
  }
}
