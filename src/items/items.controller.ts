import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
// Item クラスのインポートは Entity から。
// import { Item } from './item.model';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../entities/user.entity';
import { Role } from '../auth/decorator/role.decorator';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Item> {
    return await this.itemsService.getById(id);
  }

  @Post()
  @Role('PREMIUM')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.create(createItemDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async udpateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.itemsService.delete(id, user);
  }
}
