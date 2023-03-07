import { Body, Controller, Get, Post } from '@nestjs/common';
import { Item, ItemStatus } from './item.model';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get() // リクエスト名
  // メソッド名
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('status') status: ItemStatus = 'SOLD_OUT',
  ): Item {
    const item: Item = {
      id,
      name,
      price,
      description,
      status,
    };
    return this.itemsService.create(item);
  }
}
