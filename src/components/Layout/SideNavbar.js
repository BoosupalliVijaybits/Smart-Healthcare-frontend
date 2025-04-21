import React, { useEffect, useState } from "react";
import { doctor1, doctor4 } from "../../assets/image";
import {
  adminSideNavList,
  doctorSideNavList,
  SideNavList,
} from "../../Data/DummyJson";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import { useLocation, useNavigate } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const SideNavbar = ({
  menuactive,
  toggleFun,
  setMenuActive,
  loginType,
  poppupHandle,
  load,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [activeIndex, setActiveIndex] = useState(null);
  // console.log("location", location, loginType);
  const pathname = location?.pathname;
  // const loginType = "Patient";
  // const loginType = "Doctor";
  // const loginType = "Admin";

  const navlist =
    loginType == "PATIENT"
      ? SideNavList
      : loginType == "DOCTOR"
      ? doctorSideNavList
      : loginType == "ADMIN" && adminSideNavList;

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onNavclike = (item) => {
    if (item?.navi == "logout") {
      poppupHandle("clike");
    } else {
      navigate(item?.navi);
    }
  };
  // console.log("screenWidth", screenWidth);

  return (
    <div
      className={`${menuactive ? "navigation active" : "navigation"} textani`}
    >
      <ul>
        <li className="">
          <button
            className="d-flex ac-jc border-0 bg-transparent textani"
            onClick={() => {
              toggleFun();
            }}
          >
            <span className="icon_box">
              <MenuRoundedIcon className="icon" />
            </span>
          </button>
        </li>
        {navlist?.map((item, index) => {
          return (
            <li
              // data-tooltip="This is a tooltip on hover"
              className={`${
                (activeIndex === index && pathname == item?.navi) ||
                pathname == item?.navi ||
                item?.sub?.find((subItem) => pathname === subItem?.list)
                  ? "hovered"
                  : ""
              } pe-2 my-2 textani  `}
              // tooltip-text
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (load == false) {
                  onNavclike(item);
                  setActiveIndex(index);
                  if (screenWidth < 768) {
                    setMenuActive(true);
                  } else if (menuactive == true && screenWidth > 768) {
                    setMenuActive(false);
                  } else if (
                    (activeIndex === index && pathname == item?.navi) ||
                    pathname == item?.navi
                  ) {
                    setMenuActive(true);
                  }
                }
              }}
            >
              <a>
                <span className="icon_box  d-flex ac-jc">
                  <item.icon className="f2 fs-xxl-23 fs-xl-23 fs-lg-22 fs-sm-22 fs-xs-20" />
                </span>
                <span className="title f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13">
                  {item?.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNavbar;
