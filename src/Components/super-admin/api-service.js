import axios from "axios";

const TENANT_BASE_URL = "/tenant";
export const fetchTenantApi = () => axios.get(TENANT_BASE_URL);
export const addTenantApi = (payload) => axios.post(TENANT_BASE_URL, payload);
export const updateTenantApi = (payload) => axios.put(TENANT_BASE_URL, payload);
