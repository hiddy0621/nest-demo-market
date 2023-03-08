import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/items/dto/create-user.dto';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // DTO でプロパティチェック
    const { username, password, status } = createUserDto;
    // ハッシュ化するための salt を作成
    const salt = await bcrypt.genSalt();
    // パスワードをハッシュ化
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashPassword,
      status,
    });

    await this.save(user);
    return user;
  }
}
