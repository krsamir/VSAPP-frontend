import React from "react";
import "./Loader.css";

function Loader({ showLoader = true }) {
  return (
    <div className="ContainerHeight">
      {showLoader && <div className="lds-hourglass"></div>}
    </div>
  );
}

export default Loader;
