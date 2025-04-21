import React from "react";
import { doc_logo, login_doctor, logo3 } from "../../assets/image";

const LeftComp = () => {
  return (
    <>
      <div className="login-left p-5 container">
        {/* <div className="imgcont d-flex ac-jc rounded-3">
          <img alt={"img"} src={logo3} className="img" />
        </div> */}
        {/* <div className="big-txt-cont my-5"></div> */}
        <div className="img-cont d-flex ac-jc jump">
          <img alt={"img"} src={login_doctor} className="big-img" />
        </div>
      </div>
      {/*  */}
      {/* <div className="login-left p-5 position-relative container d-flex ac-jc flex-column ac-jc">
        <div className="d-flex ac-js gap-3">
          <div className="imgcont d-flex ac-jc rounded-3">
            <img alt={"img"} src={logo3} className="img" />
          </div>
        </div>
        <div className="img-cont d-flex w-100 ac-jc jump">
          <img alt={"img"} src={login_doctor} className="big-img" />
        </div>
      </div> */}
    </>
  );
};

export default LeftComp;
