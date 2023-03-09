import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: {
        // 有効期限を1時間でセット
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RoleGuard],
  // 認証済みユーザーがアイテム操作できるように
  // JwtStrategy とJwtAuthGuard をエクスポート
  exports: [JwtStrategy, JwtAuthGuard, RoleGuard],
})
export class AuthModule {}
