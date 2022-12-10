import axios from "axios";

export const fetchTenants = () => axios.get("/tenant");
