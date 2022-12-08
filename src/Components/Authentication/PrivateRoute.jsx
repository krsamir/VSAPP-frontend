import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import ErrorBoundary from "../Error/Error-boundry";
import Cookies from "universal-cookie";

const cookie = new Cookies();
export const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated =
    cookie.get("sid") !== undefined && cookie.get("sid") !== null;
  const location = useLocation();

  if (!children) {
    throw new Error(
      `A component needs to be specified for private route for path ${rest.path}`
    );
  }

  if (isAuthenticated) {
    return <ErrorBoundary>{children}</ErrorBoundary>;
  }

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
