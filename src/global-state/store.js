import { createStore } from "easy-peasy";
import { tenantModel } from "./tenant-model";
import { userModel } from "./user-model";
import { attendanceModel } from "./attendance-model";
const store = createStore({
  tenant: { ...tenantModel },
  users: { ...userModel },
  attendance: attendanceModel,
});

export default store;
