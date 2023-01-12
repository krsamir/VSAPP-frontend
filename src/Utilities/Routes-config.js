export const ROUTES_PATH = Object.freeze({
  LOGIN: "login",
  SUPER_ADMIN: {
    ROOT: "superadmin",
    TENANT: "tenants",
  },
  ADMIN: {
    ROOT: "admin",
    USER: "user",
    ATTENDANCE: "attendance",
  },
  USER: {
    ROOT: "/",
  },
});

export const parsedRoute = (routeArray = []) => `/${routeArray.join("/")}`;
