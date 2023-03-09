import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
// Item クラスのインポートは Entity から。
// import { Item } from './item.model';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Item Repository クラスをセットしたら
  // メソッドを適宜書き換える（サービスのメソッドを使う）

  @Get() // HTTP リクエスト名をつける
  // メソッド名
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id') // 『:』を付与してパラメーターを可変にする
  async getById(@Param('id') id: string): Promise<Item> {
    return await this.itemsService.getById(id);
  }

  // Post / Update / Delete は認証済みユーザーのみ許可したい
  // この場合は, userGuards デコレータを追加
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    // サービス同様、リポジトリからメソッドを呼ぶようにする
    return await this.itemsService.create(createItemDto);
  }

  @Patch(':id') // データ更新は Patch リクエスト
  @UseGuards(JwtAuthGuard)
  async udpateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.itemsService.delete(id);
  }
}
