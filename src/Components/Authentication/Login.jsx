import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import avtar from "../../Assets/avatar.png";
import { useLogin } from "./Hooks/useLoginHook";
function Login() {
  const FIELD_NAMES = Object.freeze({
    USERNAME: "username",
    PASSWORD: "password",
  });
  const { handleLogin, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [FIELD_NAMES.USERNAME]: "admin",
      [FIELD_NAMES.PASSWORD]: "admin",
    },
  });
  const onSubmit = (data) => handleLogin(data);

  return (
    <div className="login-app">
      <div className="login">
        <div className="avatar">
          <img src={avtar} alt="Avtar" />
        </div>
        <h2>Login</h2>
        <h3>Welcome</h3>

        <form
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="textbox">
            <input
              {...register(FIELD_NAMES.USERNAME, {
                required: { value: true, message: "Please Enter Username" },
              })}
              type="text"
              placeholder="Username"
            />
          </div>
          {errors[FIELD_NAMES.USERNAME]?.type === "required" && (
            <div role="alert" className="error-text">
              {errors[FIELD_NAMES.USERNAME]?.message}
            </div>
          )}
          <div className="textbox">
            <input
              {...register(FIELD_NAMES.PASSWORD, {
                required: { value: true, message: "Please Enter Password" },
              })}
              type="password"
              placeholder="Password"
            />
          </div>
          {errors[FIELD_NAMES.PASSWORD] && (
            <div role="alert" className="error-text">
              {errors[FIELD_NAMES.PASSWORD]?.message}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.5 : 1 }}
          >
            {isLoading ? "Please Wait" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
