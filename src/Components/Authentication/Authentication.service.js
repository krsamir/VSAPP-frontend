import axios from "axios";

export const loginApi = (payload) => axios.post("/auth/login", payload);
export const validityApi = (payload) => axios.post(`/auth/change`, payload);
export const resetToken = (payload) => axios.post(`/auth/reset`, payload);
