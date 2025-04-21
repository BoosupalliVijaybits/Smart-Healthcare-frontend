import React, { useState } from "react";
import ForgotPassForm from "../components/Login/ForgotPaassForm";
import PageLoad from "../components/Loading/PageLoad";

const CommonForgotPasswordScreen = () => {
  const [load, setLoad] = useState(false);

  return (
    <>
      {load && <PageLoad />}
      <div className="w-100 d-flex ac-jc">
        <div className="w-md-70 wi-100">
          <ForgotPassForm setLoad={setLoad} type={"user"} />
        </div>
      </div>
    </>
  );
};

export default CommonForgotPasswordScreen;
