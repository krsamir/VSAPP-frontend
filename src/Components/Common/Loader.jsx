import React from "react";
import "./Loader.css";

function LoaderIcon({ showLoader = true }) {
  return (
    <div className="ContainerHeight">
      {showLoader && <div className="lds-hourglass"></div>}
    </div>
  );
}

export default LoaderIcon;
