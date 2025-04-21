import React from "react";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { logo3 } from "../../assets/image";
import { useLocation, useNavigate } from "react-router-dom";

const TopHeader = ({ toggleFun, menuactive, setMenuActive, loginType }) => {
  const navigate = useNavigate();
  return (
    <div className={"py-md-3 w-100 px-md-5 py-2 px-2"}>
      <div
        className={`${
          menuactive ? "active" : ""
        } px-md-3 bg-light rounded-5 toptab py-0 px-1  py-md-2 d-flex ac-jb `}
      >
        <button
          onClick={() => {
            toggleFun();
          }}
          className="menu-open ac-jc rounded-5 border-0 bg-transparent "
        >
          <MenuOpenOutlinedIcon className="primary f3" />
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="menu-logo ac-jc border-0 bg-transparent d-flex "
        >
          <img src={logo3} className="" />
        </button>
        <div>
          <button
            onClick={() => {
              setMenuActive(true);
              if (loginType == "PATIENT") {
                navigate("/patient/profile");
              } else if (loginType == "DOCTOR") {
                navigate("/doctor/profile");
              } else if (loginType == "ADMIN") {
                navigate("/admin/profile");
              }
            }}
            className="profile-open ac-jc rounded-5 border-0 bg-transparent "
          >
            <PersonIcon className="primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
