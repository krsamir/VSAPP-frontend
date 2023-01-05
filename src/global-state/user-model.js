import { action, thunk } from "easy-peasy";
import { toast } from "react-hot-toast";
import {
  fetchUserApi,
  addUserApi,
  patchUserApi,
  deleteUserApi,
} from "../Components/super-admin/api-service";
import {
  resetToken,
  validityApi,
} from "../Components/Authentication/Authentication.service";
import { STATUS } from "../Utilities/Constant";

export const userModel = {
  users: [],
  loadUserArray: action((state, payload) => {
    state.users = payload ?? [];
  }),
  adToUserArray: action((state, payload) => {
    state.users.unshift(payload);
  }),
  deleteUserFromArray: action((state, payload) => {
    const index = state.users.findIndex((obj) => obj.id === payload);
    if (index > -1) {
      state.users?.splice(index, 1);
    }
  }),

  fetchUserListThunk: thunk(async ({ loadUserArray }, _, { fail }) => {
    return await fetchUserApi()
      .then((response) => {
        const {
          data: { status, data, message },
        } = response;
        if (status === STATUS.SUCCESS) {
          loadUserArray(data);
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

  patchUserArray: action((state, payload) => {
    const index = state.users.findIndex((obj) => obj.id === payload?.id);
    state.users[index] = payload;
  }),
  tokenUpdate: action((state, { id, token, validTill }) => {
    const index = state.users.findIndex((obj) => obj.id === id);
    const value = state.users[index];
    state.users[index] = { ...value, token, validTill };
  }),
  deleteTenantFromArray: action((state, payload) => {
    const index = state.users.findIndex((obj) => obj.id === payload);
    if (index > -1) {
      state.tenants?.splice(index, 1);
    }
  }),
  createUserThunk: thunk(
    async ({ adToUserArray }, payload, { fail, getStoreState }) => {
      const globalState = getStoreState();
      const tenants = globalState.tenant.tenants;
      try {
        const response = await addUserApi(payload);
        const {
          data: { status, message, data, issue },
        } = response;
        if (status === STATUS.SUCCESS) {
          const tenantData = (tenants ?? []).filter(
            (value) => value?.id === data?.tenantId
          );
          const parsedData = {
            ...data,
            tenant: tenantData.length
              ? tenantData[0]
              : { id: null, name: "", branch: "" },
          };
          adToUserArray(parsedData);
          toast.success(message);
        } else if (status === STATUS.DUPLICATE) {
          toast.error(message, { duration: 2000 });
          toast(issue, { duration: 5000 });
        } else {
          toast.error(message, { duration: 5000 });
        }
        return response;
      } catch (e) {
        fail(e);
        throw new Error(e);
      }
    }
  ),

  updateUserThunk: thunk(
    async ({ patchUserArray }, { userData, data }, { fail, getStoreState }) => {
      const globalState = getStoreState();
      const tenants = globalState.tenant.tenants;
      try {
        const response = await patchUserApi(data);
        const {
          data: { status, message, issue },
        } = response;
        if (status === STATUS.SUCCESS) {
          const tenantData = (tenants ?? []).filter(
            (value) => value?.id === data?.tenantId
          );
          const parsedData = {
            ...userData,
            ...data,
            tenant: tenantData.length
              ? tenantData[0]
              : { id: null, name: "", branch: "" },
          };
          patchUserArray(parsedData);
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
    }
  ),
  deleteUserThunk: thunk(async ({ deleteUserFromArray }, payload, { fail }) => {
    try {
      const response = await deleteUserApi(payload);
      const {
        data: { status, message },
      } = response;
      if (status === STATUS.SUCCESS) {
        deleteUserFromArray(payload);
        toast.success(message);
      } else {
        toast.error(message, { duration: 2000 });
      }
      return response;
    } catch (e) {
      fail(e);
      throw new Error(e);
    }
  }),
  generateTokenThunk: thunk(async ({ tokenUpdate }, payload, { fail }) => {
    try {
      const response = await resetToken(payload);
      const {
        data: { status, message, token, validTill },
      } = response;
      if (status === STATUS.SUCCESS) {
        tokenUpdate({ id: payload.id, token, validTill });
        toast.success(message);
      } else {
        toast.error(message, { duration: 2000 });
      }
      return response;
    } catch (e) {
      fail(e);
      throw new Error(e);
    }
  }),
  changePasswordThunk: thunk(async (_, payload, { fail }) => {
    try {
      const response = await validityApi(payload);
      console.log(payload);
      const {
        data: { status, message },
      } = response;
      if (status === STATUS.SUCCESS) {
        toast.success(message);
      } else {
        toast.error(message, { duration: 5000 });
      }
      return response;
    } catch (e) {
      fail(e);
      throw new Error(e);
    }
  }),
};
