import React, { useState } from "react";
import PageLoad from "../../components/Loading/PageLoad";
import ForgotPassForm from "../../components/Login/ForgotPaassForm";
import LeftComp from "../../components/AuthLeft/LeftComp";
import { useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const location = useLocation();
  console.log("location", location);

  const [load, setLoad] = useState(false);
  return (
    <>
      {load && <PageLoad />}
      <div className="layerss w-100">
        <LeftComp />
        <ForgotPassForm load={load} setLoad={setLoad} />
      </div>
    </>
  );
};

export default ForgotPassword;
