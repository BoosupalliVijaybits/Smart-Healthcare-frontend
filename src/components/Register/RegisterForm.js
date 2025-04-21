import React, { useState } from "react";
import RegisterToggle from "./RegisterToggle";
import PationtForm from "./PationtForm";
import DoctorForm from "./DoctorForm";
import AdminForm from "./AdminForm";

const RegisterForm = ({ setLoad }) => {
  const [droptoggle, setDropToggle] = useState(false);
  const [toggle, setToggle] = useState(0);

  const dropdownToggle = () => {
    if (droptoggle) {
      setDropToggle(false);
    } else {
      setDropToggle(!droptoggle);
    }
  };
  console.log("toggle", toggle);

  return (
    <>
      {droptoggle && (
        <button
          onClick={() => {
            dropdownToggle();
          }}
          className="position-absolute popuplayer"
        />
      )}
      <div className="register-right scroll p-0 container">
        {/* <div
          className="com"
          style={{
            height: "20px",
            width: "20px",
          }}
        /> */}
        <div className="big-cont2 d-flex ac-jc">
          <p className="text-dark f3 text-center fs-4 mb-0">Register</p>
        </div>
        <div className="register-layer d-flex ac-jc flex-column w-100">
          <div className="togglebar w-100 d-flex ac-jc mb-4">
            <RegisterToggle toggle={toggle} setToggle={setToggle} />
          </div>
          {toggle === 0 ? (
            <div className="w-100 mobile_t_mb_5">
              <PationtForm setLoad={setLoad} />
            </div>
          ) : toggle === 1 ? (
            <div className="w-100 mobile_t_mb_5">
              <DoctorForm setLoad={setLoad} />
            </div>
          ) : (
            <div className="w-100 mobile_t_mb_5">
              <AdminForm setLoad={setLoad} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
