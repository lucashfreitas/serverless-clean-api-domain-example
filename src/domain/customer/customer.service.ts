import { Customer } from '@prisma/client';
import { inject, injectable } from 'inversify';
import TYPES from '../../core/api/di-types';
import { DBService } from '../../db/db-service';
import { ActionError, ActionResult, ActionSuccess } from '../action-result';
import { CreateCustomerDto } from './customer.dto';
import { CustomerServiceInterface } from './customer.interface';

@injectable()
export class CustomerService implements CustomerServiceInterface {
  // eslint-disable-next-line no-useless-constructor
  constructor(@inject(TYPES.DBService) private db: DBService) {}

  async getCustomers(): Promise<ActionResult<Customer[]>> {
    try {
      return ActionSuccess(await this.db.client.customer.findMany());
    } catch (error) {
      return ActionError(error);
    }
  }

  async addCustomer(dto: CreateCustomerDto): Promise<ActionResult> {
    try {
      await this.db.client.customer.create({
        data: {
          email: dto.name,
        },
      });

      return ActionSuccess();
    } catch (error) {
      return ActionError(error);
    }
  }
}
