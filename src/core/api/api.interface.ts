import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DBService } from '../../db/db-service';
import { CustomerServiceInterface } from '../../domain/customer/customer.interface';
import { UserServiceInterface } from '../../domain/users/user.interface';

export type AppMidleware = (
  event: APIGatewayEvent,
  context: Context,
  app: App
) => Promise<{ event: APIGatewayEvent; context: Context; app: App }>;

export interface AppConfig {
  middlewares: AppMidleware[];
}

export type ApiHandler<T = unknown> = (
  event: APIGatewayProxyEvent,
  context,
  api: App
) => Promise<APIGatewayProxyResult>;

export interface ApiProviders {
  userService: UserServiceInterface;
  customerService: CustomerServiceInterface;
  db: DBService;
}
export interface App {
  providers: ApiProviders;
}
