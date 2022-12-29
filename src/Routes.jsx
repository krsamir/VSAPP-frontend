import Loader from "./Components/Common/Loader/Loader";
import React, { Suspense, lazy } from "react";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import { ROUTES_PATH } from "./Utilities/Routes-config";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROLES } from "./Utilities/Constant";
import User from "./Components/admin/user-management/User";

const PageNotFound = lazy(() => import("./Components/Error/page-not-found"));
const Login = lazy(() => import("./Components/Authentication/Login"));
const SuperAdminHome = lazy(() => import("./Components/super-admin/Home"));
const AdminHome = lazy(() => import("./Components/admin/Home"));
const UserHome = lazy(() => import("./Components/user/Home"));
const Tenants = lazy(() => import("./Components/super-admin/Tenants/Tenants"));
const router = createBrowserRouter([
  {
    path: ROUTES_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES_PATH.SUPER_ADMIN.ROOT,
    element: (
      <PrivateRoute hasAuthority={[ROLES.SUPER_ADMIN.VALUE]}>
        <SuperAdminHome />
      </PrivateRoute>
    ),
    children: [
      {
        path: ROUTES_PATH.SUPER_ADMIN.TENANT,
        element: (
          <PrivateRoute hasAuthority={[ROLES.SUPER_ADMIN.VALUE]}>
            <Tenants />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: ROUTES_PATH.ADMIN.ROOT,
    element: (
      <PrivateRoute hasAuthority={[ROLES.ADMIN.VALUE, ROLES.SUPER_ADMIN.VALUE]}>
        <AdminHome />
      </PrivateRoute>
    ),
    children: [
      {
        path: ROUTES_PATH.ADMIN.USER,
        element: (
          <PrivateRoute
            hasAuthority={[ROLES.ADMIN.VALUE, ROLES.SUPER_ADMIN.VALUE]}
          >
            <User />
          </PrivateRoute>
        ),
      },
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
        <UserHome />
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
