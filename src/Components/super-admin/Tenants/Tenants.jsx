import React from "react";
import { useStoreState } from "easy-peasy";
import { useGetTenants } from "../Hooks/useTenants";
import CreateTenant from "./create-tenant";
import TenantTable from "./TenantTable";
import { SuperAdminProvider } from "../Context/super-admin-provider";
function Tenants() {
  const { tenants } = useStoreState((state) => state.tenant);
  const { isLoading } = useGetTenants();
  return (
    <SuperAdminProvider>
      <CreateTenant />
      <TenantTable data={tenants ?? []} isLoading={isLoading} />
    </SuperAdminProvider>
  );
}

export default Tenants;
