/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CUSTOM_MESSAGES } from '../config/messages';
import { error, forbidden } from '../response/response';

function NotAuthorizedError(msg = CUSTOM_MESSAGES.Forbidden): void {
  this.message = msg;
}

NotAuthorizedError.prototype = Error.prototype;

const globalErrorHandler = async (
  err: Error,
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (err instanceof NotAuthorizedError) {
    return forbidden(err.message);
  }

  return error();
};

export { NotAuthorizedError, globalErrorHandler };
