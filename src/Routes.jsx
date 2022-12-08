import Loader from "./Components/Common/Loader/Loader";
import React, { Suspense, lazy } from "react";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import { ROUTES_PATH } from "./Utilities/Routes-config";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROLES } from "./Utilities/Constant";

const PageNotFound = lazy(() => import("./Components/Error/page-not-found"));
const Login = lazy(() => import("./Components/Authentication/Login"));
const Home = lazy(() => import("./Components/Common/Home"));

const router = createBrowserRouter([
  {
    path: ROUTES_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES_PATH.SUPER_ADMIN.ROOT,
    element: (
      <PrivateRoute hasAuthority={[ROLES.SUPER_ADMIN.VALUE]}>
        <Home />
      </PrivateRoute>
    ),
    children: [
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: ROUTES_PATH.ADMIN.ROOT,
    element: (
      <PrivateRoute hasAuthority={[ROLES.ADMIN.VALUE]}>
        <Home />
      </PrivateRoute>
    ),
    children: [
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: ROUTES_PATH.USER.ROOT,
    element: (
      <PrivateRoute hasAuthority={[ROLES.USER.VALUE]}>
        <Home />
      </PrivateRoute>
    ),
    children: [
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function Routes() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default Routes;
