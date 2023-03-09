import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

// サインインにおける認証用
export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
