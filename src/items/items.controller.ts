import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item, ItemStatus } from './item.model';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get() // HTTP リクエスト名をつける
  // メソッド名
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id') // 『:』を付与してパラメーターを可変にする
  getById(@Param('id') id: string): Item {
    return this.itemsService.getById(id);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): Item {
    return this.itemsService.create(createItemDto);
  }

  @Patch(':id') // データ更新は Patch リクエスト
  udpateStatus(@Param('id') id: string) {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.delte(id);
  }
}
