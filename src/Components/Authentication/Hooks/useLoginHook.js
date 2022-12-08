import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  REDIRECT_INTERVAL,
  STATUS,
  RESPONSE_STATUS,
} from "../../../Utilities/Constant";
import { loginApi } from "../Authentication.service";
import { ROLES } from "../../../Utilities/Constant";
export const useLogin = () => {
  const navigate = useNavigate();

  const navigateToPage = (path) =>
    setTimeout(() => navigate(path), REDIRECT_INTERVAL);

  const { mutate: handleLogin, isLoading } = useMutation(loginApi, {
    onSuccess(data) {
      if (data.data.status === STATUS.SUCCESS) {
        data.data.role && toast.success(data.data.message);
        if (data.data.role) {
          switch (data.data.role) {
            case ROLES.SUPER_ADMIN.VALUE:
              navigateToPage("/home/superadmin");
              break;
            case ROLES.ADMIN.VALUE:
              navigateToPage("/home/admin");
              break;
            case ROLES.USER.VALUE:
              navigateToPage("/");
              break;
            default:
              navigateToPage("/login");
              break;
          }
        } else {
          toast.error("No Role assigned. Contact Admin", {
            duration: 5000,
          });
        }
      } else {
        toast.error(data.data.message);
      }
    },
    onError(e) {
      if (e?.response?.status === RESPONSE_STATUS.FORBIDDEN_403) {
        toast.error(e.response.data.message);
      } else {
        toast.error("Caught into some Problem");
      }
      navigateToPage("/login");
    },
  });
  return { handleLogin, isLoading };
};
