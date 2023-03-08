import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/items/dto/create-user.dto';
import { EntityRepository, Repository } from 'typeorm';
import { UserStatus } from './user-status';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // DTO でプロパティチェック
    const { username, password, status } = createUserDto;
    const user = this.create({
      username,
      password,
      status,
    });

    await this.save(user);
    return user;
  }
}
