import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, CreateUserResponse, UserDto } from './dto/users.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  async create(UserDto: CreateUserDto): Promise<CreateUserResponse> {
    const userAlreadyRegistered = this.users.find(
      (u) => u.username === UserDto.username,
    );
    if (userAlreadyRegistered) {
      throw new ConflictException(`
        Usuário ${userAlreadyRegistered.username} já cadastrado
        `);
    }

    const hashedPassword = await bcrypt.hash(UserDto.password, 10);

    const newUser = { ...UserDto, password: hashedPassword, id: uuid() };
    this.users.push(newUser);

    return { id: newUser.id, username: newUser.username };
  }

  findByUsername(username: string): UserDto | undefined {
    const user = this.users.find((u) => u.username === username);
    return user;
  }
}
