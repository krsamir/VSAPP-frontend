import React, { useState } from "react";
import LeftDrawer from "../Common/LeftDrawer";
import NavBar from "../Common/NavBar";
import { superAdminLeftDrawerData } from "../Common/leftDrawer-data";
import { ROLES } from "../../Utilities/Constant";
function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <NavBar
        handleDrawer={(flag) => setOpenDrawer(flag)}
        role={ROLES.SUPER_ADMIN.NAME}
      />
      <LeftDrawer
        isOpened={openDrawer}
        slideDrawer={(flag) => setOpenDrawer(flag)}
        leftDrawerData={superAdminLeftDrawerData}
      />
    </>
  );
}

export default Home;
