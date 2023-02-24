export const TOKEN_NAME = Object.freeze({
  SID: "sid",
});

export const TIMEOUT = 0.5 * 60 * 1000;

export const REDIRECT_INTERVAL = 500;

export const ENVIRONMENT = Object.freeze({
  DEVELOPMENT: "development",
  PRODUCTION: "production",
});

export const STATUS = Object.freeze({
  FAILURE: 0,
  SUCCESS: 1,
  DUPLICATE: 2,
});

export const ROLES = Object.freeze({
  USER: {
    NAME: "user",
    VALUE: "1643951347925",
  },
  ADMIN: {
    NAME: "admin",
    VALUE: "1643951279554",
  },
  SUPER_ADMIN: {
    NAME: "super_admin",
    VALUE: "1645361933757",
  },
});

export const RESPONSE_STATUS = Object.freeze({
  OK_200: 200,
  CREATED_201: 201,
  BAD_REQUEST_400: 400,
  UNAUTHORIZED_401: 401,
  FORBIDDEN_403: 403,
  NOT_FOUND_404: 404,
  INTERNAL_SERVER_ERROR_500: 500,
});

export const ATTENDANCE_STATUS = Object.freeze({
  PENDING: "pending",
  DONE: "done",
});

export const VIEW_DATE_FORMAT = `DD-MM-YYYY`;
export const QUERY_DATE_FORMAT = `YYYY-MM-DD`;
export const VIEW_TIME_FORMAT = `DD-MMM-YYYY HH:mm:ss`;
export const ADD_TIME_FORMAT = `YYYY-MM-DD HH:mm:ss`;
