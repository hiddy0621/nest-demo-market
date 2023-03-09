import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(
    @Body() CredentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(CredentialsDto);
  }
}
