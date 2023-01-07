import React from "react";
import { Outlet } from "react-router-dom";
import { ROLES } from "../../Utilities/Constant";
import NavBar from "../Common/NavBar";
import Attendance from "./Attendance";

function Home() {
  return (
    <div>
      <NavBar role={ROLES.USER.NAME} />
      <div style={{ marginTop: "64px" }}>
        <Outlet />
        <Attendance />
      </div>
    </div>
  );
}

export default Home;
