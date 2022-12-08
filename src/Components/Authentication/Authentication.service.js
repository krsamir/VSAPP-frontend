import axios from "axios";

export const loginApi = (payload) => axios.post("/auth/login", payload);
