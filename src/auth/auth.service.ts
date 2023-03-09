import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // DI 注入
  constructor(
    private readonly userRepository: UserRepository,
    // signIn 用の JWTService
    private readonly jwtService: JwtService,
  ) {}
  // private users: User[] = [];

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    // ここでは UserRepository の findOne メソッドで検索
    const user = await this.userRepository.findOne({ username });

    // ユーザーの存在確認と、ハッシュ化されたパスワードの比較
    if (user && (await bcrypt.compare(password, user.password))) {
      // ユーザー名とパスワードをアクセストークンに付与してリターン
      const payload = { id: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    // 認証がうまくいかなかった時の例外処理
    throw new UnauthorizedException(
      'ユーザー名またはパスワードを確認してください',
    );
  }
}
