import Loader from "./Components/Common/Loader";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import ErrorBoundryRoutes from "./Components/Error/Error-boundary-routes";
const PageNotFound = lazy(() => import("./Components/Error/page-not-found"));
const Login = lazy(() => import("./Components/Authentication/Login"));
const Home = lazy(() => import("./Components/Common/Home"));
function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <ErrorBoundryRoutes>
            <Route
              path="home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </ErrorBoundryRoutes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
