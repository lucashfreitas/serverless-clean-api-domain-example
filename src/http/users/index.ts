import { APIGatewayProxyEvent } from 'aws-lambda';
import { api } from '../../core/api';
import { ApiHandler, App } from '../../core/api/api.interface';
import { toActionResponse } from '../../core/api/response/response';

const getUser: ApiHandler = async (event: APIGatewayProxyEvent, context, app: App) => {
  const users = await app.providers.userService.getUsers();
  return toActionResponse(users);
};

const createUser: ApiHandler = async (event: APIGatewayProxyEvent, context, app: App) => {
  const body = JSON.parse(event.body);
  const result = await app.providers.userService.addUser({
    name: body.name,
    email: body.email,
  });

  return toActionResponse(result);
};

export const handlerGetUser = api(getUser);
export const handlerCreateUser = api(createUser);
