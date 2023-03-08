import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/items/dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  // DI 注入
  constructor(private readonly authRepository: UserRepository) {}
  // private users: User[] = [];

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.authRepository.createUser(createUserDto);
  }
}
