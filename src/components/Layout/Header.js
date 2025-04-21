import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logo3 } from "../../assets/image";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { navlist } from "../../Data/DummyJson";

const Header = ({ scrollToTop }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  const loginStatus = 0;

  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cartList, setCartList] = useState(false);
  const [profileIcon, setProfileIcon] = useState(false);

  const menuToggle = () => {
    setMenu(!menu);
    setSearch(false);
    setCartList(false);
    setProfileIcon(false);
  };

  const profileTogglt = () => {
    setProfileIcon(!profileIcon);
    setSearch(false);
    setCartList(false);
    setMenu(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {(profileIcon || menu) && (
        <div
          onClick={() => {
            setProfileIcon(false);
            setMenu(false);
          }}
          className="fixed-bg"
        />
      )}
      <header className="header px-md-5 px-3">
        <button className="d-flex ac-jc border-0 bg-transparent">
          <div className="logo-cont">
            <img src={logo3} className="logo-img" />
          </div>
        </button>
        <nav className={`${menu ? "active" : "navbar2"} navbar2 flex-column `}>
          {navlist?.map((item) => {
            return (
              <a
                className={`${
                  item?.navigation === pathname ||
                  (item?.navigation === "/home" && pathname === "/")
                    ? "onclike2"
                    : ""
                } cp f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13`}
                onClick={() => {
                  navigate(item?.navigation);
                  handleScrollToTop();
                  setMenu(false);
                  scrollToTop();
                }}
              >
                {item?.list}
              </a>
            );
          })}
        </nav>
        {/* <div className="com" style={{ height: "20px", width: "20px" }} /> */}
        <div className="icons">
          <button
            id="menu-btn"
            className="border-0 bg-transparent  "
            onClick={() => menuToggle()}
          >
            <MenuRoundedIcon
              id="login-btn"
              className="f3 fs-xxl-33 fs-xl-32 fs-lg-31 fs-sm-30 fs-xs-29"
            />
          </button>
          <button
            className="border-0 bg-transparent"
            onClick={() => profileTogglt()}
          >
            <PersonRoundedIcon
              id="login-btn"
              className="f3 fs-xxl-33 fs-xl-32 fs-lg-31 fs-sm-30 fs-xs-29"
            />
          </button>
        </div>
        {loginStatus == 1 ? (
          <div
            className={`${
              profileIcon ? "active" : "login-form"
            } login-form border-0  d-flex flex-column`}
          >
            <button
              onClick={() => {
                navigate("/profile");
                profileTogglt();
              }}
              className="border-0 bg-transparent d-flex ac-jc"
            >
              <p className="mb-0 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                Profile
              </p>
            </button>
            <button className="border-0 bg-transparent d-flex ac-jc">
              <p className="mb-0 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                Logout
              </p>
            </button>
          </div>
        ) : (
          <div
            className={`${
              profileIcon ? "active" : "login-form"
            } login-form flex-column`}
          >
            <button
              onClick={() => {
                navigate("/login");
                setProfileIcon(false);
              }}
              className="border-0 bg-transparent d-flex ac-jc"
            >
              <p className="mb-0 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                Login
              </p>
            </button>
            <button
              onClick={() => {
                navigate("/register");
                setProfileIcon(false);
              }}
              className="border-0 bg-transparent d-flex ac-jc"
            >
              <p className="mb-0 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                Register
              </p>
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
