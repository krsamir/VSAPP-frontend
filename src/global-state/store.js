import { createStore } from "easy-peasy";
import { tenantModel } from "./tenant-model";
const store = createStore({
  tenant: { ...tenantModel },
});

export default store;
