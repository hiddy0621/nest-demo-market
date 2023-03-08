import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
// Entity から クラスを参照するように
// import { Item } from './item.model';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';

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

  // アイテムオブジェクトの作成メソッドはリポジトリに移管済み
  // そのため、そのメソッドを呼び出せばOK
  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepositry.createItem(createItemDto);
  }

  // updateStatus(id: string): Item {
  //   const item = this.getById(id);
  //   item.status = 'SOLD_OUT';
  //   return item;
  // }

  delte(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    return;
  }
}
