import axios from "axios";

// TENANT ENDPOINTS
const TENANT_BASE_URL = "/tenant";
export const fetchTenantApi = () => axios.get(TENANT_BASE_URL);
export const addTenantApi = (payload) => axios.post(TENANT_BASE_URL, payload);
export const updateTenantApi = (payload) => axios.put(TENANT_BASE_URL, payload);
export const deleteTenantApi = (payload) =>
  axios.delete(`${TENANT_BASE_URL}/${payload}`);

// USER ENDPOINTS
const USER_BASE_URL = "/user";
export const fetchUserApi = () => axios.get(USER_BASE_URL);
export const addUserApi = (payload) => axios.post(USER_BASE_URL, payload);
