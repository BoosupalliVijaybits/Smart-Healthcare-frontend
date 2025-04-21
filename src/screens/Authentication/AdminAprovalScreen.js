import React, { useState } from "react";
import PageLoad from "../../components/Loading/PageLoad";
import LeftComp from "../../components/AuthLeft/LeftComp";
import { adminwaiting } from "../../assets/image";
import { useNavigate } from "react-router-dom";

const AdminAprovalScreen = () => {
  const navigation = useNavigate();
  const [load, setLoad] = useState(false);

  const approvalHandle = () => {
    setLoad(true);
    setTimeout(() => {
      navigation("/login");
      setLoad(true);
    }, 1000);
  };

  return (
    <>
      {load && <PageLoad />}
      <div className="layerss w-100">
        <LeftComp />
        <div
          className="w-100 d-flex flex-column"
          style={{ alignItems: "center" }}
        >
          <div className="imglayer d-flex mt-5">
            <img alt={"img"} src={adminwaiting} className="image" />
          </div>
          <p className="black f2 fs-xl-17 cust-btn">
            You are successfully registered!
          </p>
          <button
            onClick={() => {
              approvalHandle();
            }}
            className="d-flex ac-jc aproval-btn px-4 py-1 border-0 rounded-3"
          >
            <p className="mb-0 white f2 fs-xl-14">
              Please wait for admin approval
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminAprovalScreen;
