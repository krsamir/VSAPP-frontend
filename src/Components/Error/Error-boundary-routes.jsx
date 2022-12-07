import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./Error-boundry";
const ErrorBoundryRoutes = ({ children }) => {
  return (
    <div>
      <Routes>
        <Route
          element={
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          }
        >
          {children}
        </Route>
      </Routes>
    </div>
  );
};

export default ErrorBoundryRoutes;
