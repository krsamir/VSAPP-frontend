import { action, thunk } from "easy-peasy";
import { toast } from "react-hot-toast";
import {
  fetchTenantApi,
  addTenantApi,
  updateTenantApi,
  deleteTenantApi,
} from "../Components/super-admin/api-service";
import { STATUS } from "../Utilities/Constant";

export const tenantModel = {
  tenants: [],
  addToTenantsArray: action((state, payload) => {
    state.tenants = payload ?? [];
  }),
  updateTenantsArray: action((state, payload) => {
    state.tenants.unshift(payload);
  }),
  patchTenantsArray: action((state, payload) => {
    const index = state.tenants.findIndex((obj) => obj.id === payload?.id);
    state.tenants[index] = payload;
  }),
  deleteTenantFromArray: action((state, payload) => {
    const index = state.tenants.findIndex((obj) => obj.id === payload);
    if (index > -1) {
      state.tenants?.splice(index, 1);
    }
  }),
  fetchTenantsList: thunk(async ({ addToTenantsArray }, _, { fail }) => {
    return await fetchTenantApi()
      .then((response) => {
        const {
          data: { status, data, message },
        } = response;
        if (status === STATUS.SUCCESS) {
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
      const response = await addTenantApi(payload);
      const {
        data: { status, message, data, issue },
      } = response;
      if (status === STATUS.SUCCESS) {
        updateTenantsArray(data);
        toast.success(message);
      } else if (status === STATUS.DUPLICATE) {
        toast.error(message, { duration: 2000 });
        toast(issue, { duration: 5000 });
      } else {
        toast.error(message, { duration: 2000 });
      }
      return response;
    } catch (e) {
      fail(e);
      throw new Error(e);
    }
  }),
  updateTenantThunk: thunk(async ({ patchTenantsArray }, payload, { fail }) => {
    try {
      const response = await updateTenantApi(payload);
      const {
        data: { status, message, issue },
      } = response;
      if (status === STATUS.SUCCESS) {
        patchTenantsArray(payload);
        toast.success(message);
      } else if (status === STATUS.DUPLICATE) {
        toast.error(message, { duration: 2000 });
        toast(issue, { duration: 5000 });
      } else {
        toast.error(message, { duration: 2000 });
      }
      return response;
    } catch (e) {
      fail(e);
      throw new Error(e);
    }
  }),
  deleteTenantThunk: thunk(
    async ({ deleteTenantFromArray }, payload, { fail }) => {
      try {
        const response = await deleteTenantApi(payload);
        const {
          data: { status, message },
        } = response;
        if (status === STATUS.SUCCESS) {
          deleteTenantFromArray(payload);
          toast.success(message);
        } else {
          toast.error(message, { duration: 2000 });
        }
        return response;
      } catch (e) {
        fail(e);
        throw new Error(e);
      }
    }
  ),
};
