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
  SUCCESS: 1,
  FAILURE: 0,
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