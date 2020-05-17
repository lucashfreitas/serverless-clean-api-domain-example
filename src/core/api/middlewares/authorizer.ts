import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { App, AppMidleware } from '../api.interface';
import { NotAuthorizedError } from '../error/errors';

export const authorizer: AppMidleware = async (
  event: APIGatewayProxyEvent,
  context: Context,
  app: App
) => {
  if (true) {
    throw new NotAuthorizedError();
  }

  return {
    event,
    context,
    app,
  };
};
