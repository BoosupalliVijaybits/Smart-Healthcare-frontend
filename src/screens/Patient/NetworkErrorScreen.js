import React from "react";
import { network_err, notfound } from "../../assets/image";

const NetworkErrorScreen = () => {
  return (
    <div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <img
          src={network_err}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

export default NetworkErrorScreen;
