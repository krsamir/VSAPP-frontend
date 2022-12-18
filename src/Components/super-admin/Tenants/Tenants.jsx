import React from "react";
import CreateTenant from "./create-tenant";
import TenantTable from "./TenantTable";
import { SuperAdminProvider } from "../Context/super-admin-provider";
function Tenants() {
  return (
    <SuperAdminProvider>
      <CreateTenant />
      <TenantTable />
    </SuperAdminProvider>
  );
}

export default Tenants;
