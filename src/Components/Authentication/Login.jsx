import React, { useState } from "react";
import "./Login.css";
import avtar from "../../Assets/avatar.png";
import { useLogin } from "./Hooks/useLoginHook";
function Login() {
  const [data, setData] = useState({
    username: "admin",
    password: "admin",
  });
  const { handleLogin } = useLogin();
  const handleChange = ({ target: { name, value } }) => {
    const parsedData = { ...data };
    parsedData[name] = value;
    setData(parsedData);
  };
  return (
    <div className="login-app">
      <div className="login">
        <div className="avatar">
          <img src={avtar} alt="Avtar" />
        </div>
        <h2>Login</h2>
        <h3>Welcome Back</h3>

        <form className="login-form">
          <div className="textbox">
            <input
              type="text"
              placeholder="Username"
              autoComplete="false"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
            {/* <span className="material-symbols-outlined"> account_circle </span> */}
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              autoComplete="false"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {/* <span className="material-symbols-outlined"> lock </span> */}
          </div>
          <button type="button" onClick={() => handleLogin(data)}>
            LOGIN
          </button>
          <span>Forgot your credentials?</span>
        </form>
      </div>
    </div>
  );
}

export default Login;
