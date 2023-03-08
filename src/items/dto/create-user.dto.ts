import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserStatus } from 'src/auth/user-status';

export class CreateUserDto {
  // id: string

  // プロパティにバリデーション追加
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  status: UserStatus;
}
