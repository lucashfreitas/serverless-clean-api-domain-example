import { Customer } from '@prisma/client';
import { ActionResult } from '../action-result';
import { CreateCustomerDto } from './customer.dto';

export interface CustomerServiceInterface {
  getCustomers(): Promise<ActionResult<Customer[]>>;
  addCustomer(dto: CreateCustomerDto): Promise<ActionResult>;
}
