import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, Min, MaxLength } from 'class-validator';

export class CreateItemDto {
  // id: string;

  // 各プロパティにバリーデーションを追加
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
