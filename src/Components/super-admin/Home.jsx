import React, { useState } from "react";
import LeftDrawer from "../Common/LeftDrawer";
import NavBar from "../Common/NavBar";

function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
      <NavBar handleDrawer={(flag) => setOpenDrawer(flag)} />
      <LeftDrawer
        isOpened={openDrawer}
        slideDrawer={(flag) => setOpenDrawer(flag)}
      />
    </div>
  );
}

export default Home;
