import React from "react";
import { registertype } from "../../Data/DummyJson";

const RegisterToggle = ({ toggle, setToggle }) => {
  return (
    <div className="toggle-bar d-flex ac-jb p-1 rounded-5">
      <button
        className={`${"toggle-btn3 rounded-5 border-0"}`}
        style={{
          left: toggle === 0 ? "1%" : `${toggle * 49.4}%`, // Adjust position based on index
          transition: " 0.3s ease-in-out", // Smooth animation
        }}
      />
      {registertype?.map((item, index) => {
        return (
          <button
            onClick={() => {
              setToggle(index);
            }}
            className={
              "toggle-btn bg-transparent rounded-5 border-0 d-flex ac-jc"
            }
          >
            <p
              className={`${
                toggle === index ? "m-0 white f3" : "m-0 black f1"
              } fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 `}
            >
              {item?.name}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default RegisterToggle;
