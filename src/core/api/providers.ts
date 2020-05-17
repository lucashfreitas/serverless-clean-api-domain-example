import { DBService } from '../../db/db-service';
import { CustomerServiceInterface } from '../../domain/customer/customer.interface';
import { UserServiceInterface } from '../../domain/users/user.interface';
import { ApiProviders } from './api.interface';
import container from './container';
import TYPES from './di-types';

export const registerProviders = (): ApiProviders => {
  const providers: ApiProviders = {
    db: container.get<DBService>(TYPES.DBService),
    userService: container.get<UserServiceInterface>(TYPES.UserService),
    customerService: container.get<CustomerServiceInterface>(TYPES.CustomerService),
  };

  return providers;
};
