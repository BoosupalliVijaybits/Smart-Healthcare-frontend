import React from "react";
import { useNavigate } from "react-router-dom";

const BeforeLoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className="b-btncont d-flex ac-jc flex-column gap-3 mt-4 ">
      {/* <p
        style={{ textShadow: "2px 2px 4px #ffffff" }}
        className=" primary text-md-center text-start mb-0 f3 fs-xxl-38 fs-xl-37 fs-lg-36 fs-sm-30 fs-xs-20"
      >
        Welcome to Smart Healthcare Platform
      </p> */}
      <p className="dark_primary text-md-center text-start mb-0 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15">
        Select your role to continue
      </p>
      <div className="d-flex gap-3 bt-res">
        <button
          style={{ width: "200px" }}
          onClick={() => {
            navigate("/login");
          }}
          className="b-btn dark_primary f3 py-1 py-md-2 px-1 px-md-3 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-14"
        >
          Login
        </button>
        <button
          style={{ width: "200px" }}
          onClick={() => {
            navigate("/register");
          }}
          className="b-btn dark_primary f3 py-1 py-md-2 px-1 px-md-3 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-14"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default BeforeLoginForm;
