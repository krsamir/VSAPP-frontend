import { action, thunk } from "easy-peasy";
import { toast } from "react-hot-toast";
import {
  fetchUserApi,
  addUserApi,
} from "../Components/super-admin/api-service";
import { STATUS } from "../Utilities/Constant";

export const userModel = {
  users: [],
  loadUserArray: action((state, payload) => {
    state.users = payload ?? [];
  }),
  adToUserArray: action((state, payload) => {
    state.users.unshift(payload);
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
        }
        return response;
      } catch (e) {
        fail(e);
        throw new Error(e);
      }
    }
  ),
};
