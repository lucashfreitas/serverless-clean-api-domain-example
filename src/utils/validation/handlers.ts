const Success = <T>(data: T = null, message = null, error = null): ApiResponse<T> => {
  return {
    statusCode: 200,
    body: {
      data,
      error,
      message,
    },
  };
};

const FailValidation = <T>(data: T = null, message = null, error = null): ApiResponse<T> => {
  return {
    statusCode: 400,
    body: {
      data,
      error,
      message,
    },
  };
};

const Error = <T>(
  data: T = null,
  message = 'Sorry Something went wrong. Please try again or contact system administrator',
  error = 'ERROR'
): ApiResponse<T> => {
  return {
    statusCode: 500,
    body: {
      data,
      error,
      message,
    },
  };
};

export interface ApiResponse<T> {
  statusCode: number;
  body: {
    data?: T;
    message: string;
    error: string;
  };
}

export default {
  Success,
  FailValidation,
  Error,
};
