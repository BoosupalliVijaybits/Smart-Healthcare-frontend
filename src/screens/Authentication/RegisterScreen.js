import React, { useState } from "react";
import PageLoad from "../../components/Loading/PageLoad";
import LeftComp from "../../components/AuthLeft/LeftComp";
import RegisterForm from "../../components/Register/RegisterForm";

const RegisterScreen = () => {
  const [load, setLoad] = useState(false);
  return (
    <>
      {load && <PageLoad />}
      <div className="layerss w-100">
        <LeftComp />
        <RegisterForm setLoad={setLoad} />
      </div>
    </>
  );
};

export default RegisterScreen;
