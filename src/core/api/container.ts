import { Container } from 'inversify';
import 'reflect-metadata';
import { DBService } from '../../db/db-service';
import { CustomerService } from '../../domain/customer/customer.service';
import { UserService } from '../../domain/users/users.service';
import TYPES from './di-types';

const container: Container = new Container();

container.bind<DBService>(TYPES.DBService).to(DBService).inSingletonScope();
container.bind<CustomerService>(TYPES.CustomerService).to(CustomerService).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();

export default container;
