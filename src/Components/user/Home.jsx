import React from "react";
import { ROLES } from "../../Utilities/Constant";
import NavBar from "../Common/NavBar";

function Home() {
  return (
    <div>
      <NavBar role={ROLES.USER.NAME} />
    </div>
  );
}

export default Home;
