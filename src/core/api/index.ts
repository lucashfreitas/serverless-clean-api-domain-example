import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { App, AppConfig } from './api.interface';
import { globalErrorHandler } from './error/errors';
import { executeMiddlewares } from './middlewares';
import { registerProviders } from './providers';

export const api = (fn: Function, appConfig: AppConfig = null) => {
  const app: App = {
    providers: null,
  };

  const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    let result = null;
    try {
      const providers = registerProviders();

      Object.assign(app, {
        providers,
      });
      if (appConfig) {
        const e = await executeMiddlewares(event, context, app, appConfig.middlewares);
        result = await fn(e.evt, e.ctx, app);
      } else {
        result = await fn(event, context, app);
      }
    } catch (error) {
      return globalErrorHandler(error, event, context);
    }

    return result;
  };

  return handler;
};
