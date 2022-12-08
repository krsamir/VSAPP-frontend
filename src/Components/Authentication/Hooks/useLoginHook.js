import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  REDIRECT_INTERVAL,
  STATUS,
  RESPONSE_STATUS,
} from "../../../Utilities/Constant";
import { loginApi } from "../Authentication.service";

export const useLogin = () => {
  const navigate = useNavigate();

  const navigateToPage = (path) =>
    setTimeout(() => navigate(path), REDIRECT_INTERVAL);

  const { mutate: handleLogin, isLoading } = useMutation(loginApi, {
    onSuccess(data) {
      console.log(data.data);
      if (data.data.status === STATUS.SUCCESS) {
        toast.success(data.data.message);
      } else {
        toast.error(data.data.message);
      }
      navigateToPage("/home");
    },
    onError(e) {
      if (e?.response?.status === RESPONSE_STATUS.FORBIDDEN_403) {
        toast.error(e.response.data.message);
      } else {
        toast.error("Caught into some Problem");
      }
      //   navigateToPage("/login");
    },
  });
  return { handleLogin, isLoading };
};
