import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import ErrorBoundary from "../Error/Error-boundry";
import { ROLES } from "../../Utilities/Constant";

const cookie = new Cookies();
export const PrivateRoute = ({ children, hasAuthority = [], ...rest }) => {
  const isAuthenticated =
    cookie.get("sid") !== undefined && cookie.get("sid") !== null;
  !isAuthenticated && console.warn("AUTHENTICATION ERROR");
  const role = cookie.get("role");
  !hasAuthority.includes(role) && console.warn("AUTHORIZATION ERROR");
  if (typeof hasAuthority !== typeof []) {
    console.error(
      `Please pass an array of Roles e.x. [${ROLES.SUPER_ADMIN.NAME}, ${ROLES.ADMIN.NAME}, ${ROLES.USER.NAME}]`
    );
    hasAuthority = [];
  } else {
    if (hasAuthority.length === 0) {
      hasAuthority = [].concat([
        ROLES.SUPER_ADMIN.VALUE,
        ROLES.ADMIN.VALUE,
        ROLES.USER.VALUE,
      ]);
    }
  }
  // console.log(`☣Authority -> ${hasAuthority}⚠`);
  const location = useLocation();

  if (!children) {
    throw new Error(
      `A component needs to be specified for private route for path ${rest.path}`
    );
  }
  if (isAuthenticated && hasAuthority.includes(role)) {
    return <ErrorBoundary>{children}</ErrorBoundary>;
  }

  cookie.remove("sid", { path: "/" });
  cookie.remove("role", { path: "/" });
  return (
    <Navigate
      to={{
        pathname: "/login",
        search: location.search,
      }}
      replace
      state={{ from: location }}
    />
  );
};

export default PrivateRoute;
