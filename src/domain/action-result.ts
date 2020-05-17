import { CUSTOM_MESSAGES } from '../core/api/config/messages';

export class ActionResult<T = any> {
  success: boolean;

  code?: string;

  object?: T;

  error?: string;

  message?: string;

  exception?: any;

  get hasError(): boolean {
    return (this.error && this.error.length > 0) || this.exception;
  }

  get validationError(): boolean {
    return !this.error && !this.exception && this.success === false;
  }
}

/**
 * Actions with success result
 * @param object
 * @param message
 */

export const ActionSuccess = <T>(object: T = undefined, message?: string): ActionResult => {
  const result = new ActionResult<T>();
  result.object = object;
  result.success = true;
  result.message = message;
  return result;
};

/**
 * Actions which resulted in exceptions
 * @param ex
 * @param message
 */
export const ActionError = (ex: any, message = CUSTOM_MESSAGES.UnexpectedError): ActionResult => {
  console.log(`Action Error: ${message}`);
  console.log(ex);
  const result = new ActionResult();
  result.exception = ex;
  result.success = false;
  result.error = 'Unexpected Error';
  result.message = message;
  return result;
};

/**
 * Actions with failed at some validation/business rules.
 * @param message
 */
export const ActionFailValidation = (message = CUSTOM_MESSAGES.ValidationFail): ActionResult => {
  const result = new ActionResult();
  result.success = false;
  result.message = message;
  return result;
};
