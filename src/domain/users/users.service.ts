import { User } from '@prisma/client';
import { inject, injectable } from 'inversify';
import TYPES from '../../core/api/di-types';
import { DBService } from '../../db/db-service';
import { ActionError, ActionResult, ActionSuccess } from '../action-result';
import { UserServiceInterface } from './user.interface';
import { CreateUserDto } from './users.dto';

@injectable()
export class UserService implements UserServiceInterface {
  // eslint-disable-next-line no-useless-constructor
  constructor(@inject(TYPES.DBService) private db: DBService) {
    console.log(`constructor called`);
  }

  async getUsers(): Promise<ActionResult<User[]>> {
    try {
      const userList = await this.db.client.user.findMany();
      return ActionSuccess(userList);
    } catch (error) {
      return ActionError(error);
    }
  }

  async addUser(dto: CreateUserDto): Promise<ActionResult> {
    try {
      await this.db.client.user.create({
        data: {
          email: dto.email,
          first_name: dto.name,
        },
      });

      return ActionSuccess();
    } catch (error) {
      return ActionError(error);
    }
  }
}
