import { User } from '@prisma/client';
import { ActionResult } from '../action-result';
import { CreateUserDto } from './users.dto';

export interface UserServiceInterface {
  getUsers(): Promise<ActionResult<User[]>>;
  addUser(dto: CreateUserDto): Promise<ActionResult>;
}
