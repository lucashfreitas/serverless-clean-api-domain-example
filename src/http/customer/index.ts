import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { api } from '../../core/api';
import { ApiHandler, App } from '../../core/api/api.interface';
import { toActionResponse } from '../../core/api/response/response';

const getCustomers: ApiHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  app: App
) => {
  return toActionResponse(await app.providers.customerService.getCustomers());
};

const createCustomer: ApiHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  app: App
) => {
  const body = JSON.parse(event.body);
  const result = await app.providers.customerService.addCustomer({
    name: body.name,
  });

  return toActionResponse(result);
};

export const handlerGetCustomers = api(getCustomers);
export const handleAddCustomer = api(createCustomer);
