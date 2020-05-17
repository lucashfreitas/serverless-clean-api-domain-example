import { APIGatewayProxyResult } from 'aws-lambda';
import { ActionResult } from '../../../domain/action-result';

export const HttpStatusCode = {
  OK: 200,
  ERROR: 500,
  CONFLICT: 409,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
};

export class BaseResponse<T = any> {
  data: T;

  message: string;

  error: string;
}

export const forbidden = (message: string): APIGatewayProxyResult => {
  const response = new BaseResponse();
  response.message = message;
  response.error = 'Forbidden';
  return {
    statusCode: HttpStatusCode.FORBIDDEN,
    body: JSON.stringify(response),
  };
};

export const error = (body: string = null): APIGatewayProxyResult => {
  return {
    statusCode: HttpStatusCode.ERROR,
    body,
  };
};

export const conflict = (body: string = null): APIGatewayProxyResult => {
  return {
    statusCode: HttpStatusCode.CONFLICT,
    body,
  };
};

export const ok = (body: string = null): APIGatewayProxyResult => {
  return {
    statusCode: HttpStatusCode.OK,
    body,
  };
};

export const toActionResponse = (result: ActionResult): APIGatewayProxyResult => {
  const response = new BaseResponse();
  response.data = result.object;
  response.error = result.error;
  response.message = result.message;

  if (result.hasError) {
    return error(JSON.stringify(response));
  }
  if (!result.success) {
    return error(JSON.stringify(response));
  }
  return ok(JSON.stringify(response));
};
