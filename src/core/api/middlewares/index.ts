import { APIGatewayEvent, Context } from 'aws-lambda';
import { App, AppMidleware } from '../api.interface';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const executeMiddlewares = async (
  evt: APIGatewayEvent,
  ctx: Context,
  app: App,
  middlewares: AppMidleware[],
  index = 0
): Promise<{ evt: APIGatewayEvent; ctx: Context }> => {
  if (!middlewares || middlewares.length === 0) {
    console.log('No middlewares to be executed');
  }

  if (middlewares.length - 1 < index) {
    return {
      evt,
      ctx,
    };
  }

  const middleware = middlewares[index];
  if (typeof middleware === 'function') {
    const result = await middleware(evt, ctx, app);
    return executeMiddlewares(result.event, result.context, result.app, middlewares, index + 1);
  }

  console.error(`The middleware is not a function. See the middleware object log for more info`);
  console.error(middleware);
  throw Error(`Invalid Middleware`);
};
