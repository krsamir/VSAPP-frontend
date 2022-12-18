import { action, thunk } from "easy-peasy";
import { toast } from "react-hot-toast";
import {
  fetchTenants,
  addTenants,
} from "../Components/super-admin/api-service";
import { STATUS } from "../Utilities/Constant";

export const tenantModel = {
  tenants: [],
  addToTenantsArray: action((state, payload) => {
    state.tenants = payload ?? [];
  }),
  updateTenantsArray: action((state, payload) => {
    state.tenants.push(payload);
  }),
  fetchTenantsList: thunk(async ({ addToTenantsArray }, _, { fail }) => {
    return await fetchTenants()
      .then((response) => {
        const {
          data: { status, data, message },
        } = response;
        if (status === 1) {
          addToTenantsArray(data);
        } else {
          toast.error(message);
        }
        return response;
      })
      .catch((e) => {
        fail(e);
        throw new Error(e);
      });
  }),
  createTenants: thunk(async ({ updateTenantsArray }, payload, { fail }) => {
    try {
      const response = await addTenants(payload);
      const {
        data: { status, message, data, issue },
      } = response;
      if (status === STATUS.SUCCESS) {
        updateTenantsArray(data);
        toast.success(message);
      } else if (status === STATUS.DUPLICATE) {
        toast.error(message, { duration: 2000 });
        toast(issue, { duration: 5000 });
      }
      return response;
    } catch (e) {
      fail(e);
      throw new Error(e);
    }
  }),
};
