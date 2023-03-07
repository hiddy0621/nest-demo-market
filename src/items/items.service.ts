import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  // 基本的なCRUD操作

  findAll(): Item[] {
    return this.items;
  }
  // ID から商品を検索する
  getById(id: string): Item {
    return this.items.find((item) => item.id === id);
  }
  create(item: Item): Item {
    this.items.push(item);
    return item;
  }
  updateStatus(id: string): Item {
    const item = this.getById(id);
    item.status = 'SOLD_OUT';
    return item;
  }
  delte(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    return;
  }
}
