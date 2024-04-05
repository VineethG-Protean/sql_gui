export const RESPONSE = {
  OK: (message?: string | string[], data?: any | any[]) => {
    return {
      ERROR: false,
      STATUS: 200,
      MESSAGE: message ? message : "OK",
      DATA: data ? data : [],
    };
  },
  NOT_FOUND: (message?: string | string[]) => {
    return {
      ERROR: true,
      STATUS: 404,
      MESSAGE: message ? message : "NOT FOUND",
    };
  },
  INTERNAL_SERVER_ERROR: (message?: string | string[]) => {
    return {
      ERROR: true,
      STATUS: 500,
      MESSAGE: message ? message : "INTERNAL SERVER ERROR",
    };
  },
  NOT_SUPPORTED: (message?: string | string[]) => {
    return {
      ERROR: true,
      STATUS: 501,
      MESSAGE: message ? message : "NOT IMPLEMENTED",
    };
  },
  UNPROCESSABLE_ENTITY: (message?: string | string[]) => {
    return {
      ERROR: true,
      STATUS: 422,
      MESSAGE: message ? message : "UNPROCESSABLE ENTITY",
    };
  },
};
