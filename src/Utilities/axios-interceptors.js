import axios from "axios";
import { toast } from "react-hot-toast";
import Cookie from "universal-cookie";
import { TIMEOUT, TOKEN_NAME } from "./Constant";

axios.defaults.timeout = TIMEOUT;
const cookies = new Cookie();

const setupAxiosInterceptors = () => {
  const onRequestSuccess = (config) => {
    const token = cookies.get(TOKEN_NAME.SID);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (err) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      toast.error("Please Login Again.", { duration: 3000 });
      if (cookies.get(TOKEN_NAME.SID)) {
        cookies.remove(TOKEN_NAME.SID, { path: "/" });
        window.location.reload();
      }
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
