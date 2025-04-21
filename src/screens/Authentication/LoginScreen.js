import React, { useState } from "react";
import LoginForm from "../../components/Login/LoginForm";
import PageLoad from "../../components/Loading/PageLoad";
import LeftComp from "../../components/AuthLeft/LeftComp";

const LoginScreen = () => {
  const [load, setLoad] = useState(false);

  return (
    <>
      {load && <PageLoad />}
      <div className="layerss w-100">
        <LeftComp />
        <LoginForm load={load} setLoad={setLoad} />
      </div>
    </>
  );
};

export default LoginScreen;
