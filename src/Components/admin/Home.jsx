import React, { useState } from "react";
import NavBar from "../Common/NavBar";
import LeftDrawer from "../Common/LeftDrawer";
import { adminLeftDrawerData } from "../Common/leftDrawer-data";
import { ROLES } from "../../Utilities/Constant";

function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <NavBar
        handleDrawer={(flag) => setOpenDrawer(flag)}
        role={ROLES.ADMIN.NAME}
      />
      <LeftDrawer
        isOpened={openDrawer}
        slideDrawer={(flag) => setOpenDrawer(flag)}
        leftDrawerData={adminLeftDrawerData}
      />
    </>
  );
}

export default Home;
