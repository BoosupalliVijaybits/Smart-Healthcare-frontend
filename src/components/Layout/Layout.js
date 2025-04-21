import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import SideNavbar from "./SideNavbar";
import TopHeader from "./TopHeader";

const Layout = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuactive, setMenuActive] = useState(true);

  const toggleFun = () => {
    setMenuActive(!menuactive);
  };
  const loginType = false;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY > lastScrollY && currentScrollY > 70) {
  //       setIsVisible(false);
  //     } else {
  //       setIsVisible(true);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);
  return (
    <>
      {loginType ? (
        <div className="layer">
          <div className="containersss">
            <SideNavbar toggleFun={toggleFun} menuactive={menuactive} />
            <div className={`${menuactive ? "main active" : "main"}`}>
              {/* <Header toggleFun={toggleFun} menuactive={menuactive} /> */}
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* <Navbar isVisible={isVisible} /> */}
          {loginType ? <SideNavbar /> : <Header scrollToTop={scrollToTop} />}
          <div className={` ${isVisible ? "main-page" : "main-page2"}`}>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
