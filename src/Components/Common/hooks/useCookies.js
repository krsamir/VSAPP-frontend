import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const cookie = new Cookies();

export const useCookies = () => {
  const navigate = useNavigate();
  const removeCookies = () => {
    cookie.remove("sid", { path: "/" });
    cookie.remove("role", { path: "/" });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const getCookie = (name) => cookie.get(name);

  return { removeCookies, getCookie };
};
