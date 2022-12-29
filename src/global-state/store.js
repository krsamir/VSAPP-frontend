import { createStore } from "easy-peasy";
import { tenantModel } from "./tenant-model";
import { userModel } from "./user-model";
const store = createStore({
  tenant: { ...tenantModel },
  users: { ...userModel },
});

export default store;
