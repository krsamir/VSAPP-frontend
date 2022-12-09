import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { ROUTES_PATH, parsedRoute } from "../../Utilities/Routes-config";

export const superAdminLeftDrawerData = [
  {
    id: 1,
    name: "Tenants",
    redirect: parsedRoute([
      ROUTES_PATH.SUPER_ADMIN.ROOT,
      ROUTES_PATH.SUPER_ADMIN.TENANT,
    ]),
    icon: <AddBusinessIcon />,
  },
];

export const adminLeftDrawerData = [
  {
    id: 1,
    name: "User",
    redirect: parsedRoute([
      ROUTES_PATH.SUPER_ADMIN.ROOT,
      ROUTES_PATH.SUPER_ADMIN.TENANT,
    ]),
    icon: <AddBusinessIcon />,
  },
];
