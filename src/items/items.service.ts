import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.model';
import { v4 as uuid } from 'uuid';

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
  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
      id: uuid(),
      ...createItemDto,
      status: 'ON_SALE',
    };
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
