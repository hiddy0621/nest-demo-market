import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ItemRepository } from './item.repository';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  // リポジトリの登録
  // forRootではなく、 forFeatureで閉じた設定にする
  imports: [TypeOrmModule.forFeature([ItemRepository]), AuthModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
