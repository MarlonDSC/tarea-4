import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/user.model';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'test',
      password: 'test',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}