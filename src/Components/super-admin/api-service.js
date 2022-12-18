import axios from "axios";

export const fetchTenants = () => axios.get("/tenant");
export const addTenants = (payload) => axios.post("/tenant", payload);
