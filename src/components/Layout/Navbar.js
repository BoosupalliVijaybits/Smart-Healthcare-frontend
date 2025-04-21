import React, { useEffect, useState } from "react";
import { logo } from "../../assets/image";
import MenuIcon from "@mui/icons-material/Menu";
import { navlist } from "../../Data/DummyJson";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ isVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const pathname = location?.pathname;

  const [navshow, setNavShow] = useState(false);
  return (
    <>
      <div className={`${navshow ? "navlist-cont2 show" : "navlist-cont2 "}`}>
        <div className="w-100 d-flex ac-je">
          <button
            onClick={() => {
              setNavShow(!navshow);
            }}
            className="close-btn border-0  bg-transparent"
          >
            <CloseIcon className="f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-25 primary" />
          </button>
        </div>
        {navlist?.map((item, index) => {
          return (
            <button
              onClick={() => {
                navigate(item?.navigation);
                setNavShow(!navshow);
              }}
              key={index}
              className={`${
                item?.navigation == pathname
                  ? "d-flex ac-jc border-0 nav-btn px-4 onclike2"
                  : "d-flex ac-jc border-0 nav-btn px-4"
              }`}
            >
              <p className="mb-0 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                {item?.list}
              </p>
            </button>
          );
        })}
      </div>
      <header
        className={`nav px-3 px-md-5 ${isVisible ? "visible" : "hidden"}`}
      >
        <div className="logo-section">
          <button className="d-flex ac-jc border-0 bg-transparent">
            <div className="logo-cont">
              <img src={logo} className="logo-img" />
            </div>
          </button>
        </div>
        <div className="d-flex gap-3">
          <button
            onClick={() => {
              setNavShow(!navshow);
            }}
            className="menu-btn border-0 bg-transparent"
          >
            <MenuIcon className="f3 fs-xxl-34 fs-xl-33 fs-lg-32 fs-sm-31 fs-xs-30 primary" />
          </button>
          <div className="navlist-cont">
            {navlist?.map((item, index) => {
              return (
                <button
                  onClick={() => {
                    navigate(item?.navigation);
                    setNavShow(!navshow);
                  }}
                  key={index}
                  className={`${
                    item?.navigation == pathname
                      ? "d-flex ac-jc border-0 nav-btn px-4 onclike"
                      : "d-flex ac-jc border-0 nav-btn px-4"
                  }`}
                >
                  <p className="mb-0 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                    {item?.list}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* <div className="profile-cont d-flex ac-jc rounded-3">
        <div className="proimg-cont d-flex ac-jc rounded-5">
          <AccountCircleOutlinedIcon className="white" />
        </div>
        <div className="proimg-cont d-flex ac-jc rounded-5">
          <img src={dummyprofile} className="proimg" alt="Profile" />
        </div>
        <p className="mb-0">vijay</p>
      </div> */}
      </header>
    </>
  );
};

export default Navbar;
