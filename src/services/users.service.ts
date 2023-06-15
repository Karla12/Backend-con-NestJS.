import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/dtos/users.dtos';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [{
    id: 1,
    email: 'karla@platzi.com',
    password: 'Qwe123!!',
  }];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: any) {
    const user = this.findOne(id);
    if (!user) {
      return null;
    }
    const indexUser = this.users.findIndex((item) => item.id === id);
    this.users[indexUser] = { ...user, ...payload };
    return this.users[indexUser];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
