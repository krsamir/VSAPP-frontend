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
import { ROUTES_PATH, parsedRoute } from "../../../Utilities/Routes-config";
import { useStoreActions } from "easy-peasy";
import { useMemo } from "react";

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
              navigateToPage(parsedRoute([ROUTES_PATH.SUPER_ADMIN.ROOT]));
              break;
            case ROLES.ADMIN.VALUE:
              navigateToPage(parsedRoute([ROUTES_PATH.ADMIN.ROOT]));
              break;
            case ROLES.USER.VALUE:
              navigateToPage(parsedRoute([]));
              break;
            default:
              navigateToPage(parsedRoute([ROUTES_PATH.LOGIN]));
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
      navigateToPage(parsedRoute([ROUTES_PATH.LOGIN]));
    },
  });
  return { handleLogin, isLoading };
};

export const useGenerateToken = () => {
  const { generateTokenThunk } = useStoreActions((store) => store.users);
  const { mutate: generateToken } = useMutation(generateTokenThunk, {
    onError(e) {
      console.log(e);
      toast.error(`Issue while generating token.`);
    },
  });
  return useMemo(
    () => ({
      generateToken,
    }),
    [generateToken]
  );
};

export const useChangePassword = () => {
  const { changePasswordThunk } = useStoreActions((store) => store.users);
  const { mutate: changePassword } = useMutation(changePasswordThunk, {
    onError(error) {
      console.log(error);
      toast.error(`Unable to reset password./पासवर्ड रीसेट करने में असमर्थ।`);
    },
  });

  return useMemo(
    () => ({
      changePassword,
    }),
    [changePassword]
  );
};
