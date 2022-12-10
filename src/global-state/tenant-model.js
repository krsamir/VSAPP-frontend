import { action, thunk } from "easy-peasy";
import { fetchTenants } from "../Components/super-admin/api-service";

export const tenantModel = {
  tenants: null,
  addToTenants: action((state, payload) => {
    state.tenants = payload;
  }),
  fetchTenantsList: thunk(async (actions, payload) => {
    const { data } = await fetchTenants();
    actions.addToTenants(data);
  }),
};
