import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import SideNavbar from "./SideNavbar";
import TopHeader from "./TopHeader";
import useUser from "../../Data/Local/userDetail";
import Poppup from "../Common/Poppup/Poppup";
import { useDispatch } from "react-redux";
import { saveBackHandler } from "../../Data/Redux/slice/backHandler";
import PageLoad from "../Loading/PageLoad";
import { useLogoutMutation } from "../../Data/Api/api";
import { toast } from "react-toastify";

const Layout1 = () => {
  const dicpatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuactive, setMenuActive] = useState(true);
  const [load, setLoad] = useState(false);

  const { user, setUser } = useUser();
  const [logoutpop, setLogoutPop] = useState(false);

  // Api
  const [logoutApi] = useLogoutMutation();

  const toggleFun = () => {
    setMenuActive(!menuactive);
  };

  const loginType = user?.type;
  // console.log("inLayout1", user, loginType);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const poppupHandle = (type) => {
    if (type == "yes") {
      setLoad(true);
      logoutApi()
        .unwrap()
        .then((res) => {
          setLoad(false);
          dicpatch(saveBackHandler(true));
          navigate("/login");
          setUser(null);
          setLogoutPop(false);
          toast.success("Logout successful!");
        })
        .catch((err) => {
          setLoad(false);
          dicpatch(saveBackHandler(true));
          navigate("/login");
          setUser(null);
          setLogoutPop(false);
          window.location.reload();
          toast.success("Logout successful!");
        })
        .finally(() => {
          setLoad(false);
          dicpatch(saveBackHandler(true));
          navigate("/login");
          setUser(null);
          setLogoutPop(false);
          window.location.reload();
        });
    } else if (type == "no") {
      setLogoutPop(!logoutpop);
    } else if (type == "clike") {
      setLogoutPop(true);
    } else {
      setLogoutPop(!logoutpop);
    }
  };

  return (
    <>
      {load && <PageLoad />}
      {logoutpop && (
        <Poppup
          type="logout"
          cont=" Are you sure you want to Logout ?"
          poppupHandle={poppupHandle}
        />
      )}
      {loginType ? (
        <div className="layer">
          <div className="containersss">
            {/* {logoutpop && (
              <Poppup
                type="logout"
                cont=" Are you sure you want to Logout ?"
                poppupHandle={poppupHandle}
              />
            )} */}

            <SideNavbar
              setMenuActive={setMenuActive}
              toggleFun={toggleFun}
              menuactive={menuactive}
              loginType={loginType}
              poppupHandle={poppupHandle}
              load={load}
            />
            <div className={`${menuactive ? "main active" : "main"}`}>
              {/* <Header toggleFun={toggleFun} menuactive={menuactive} /> */}
              <TopHeader
                setMenuActive={setMenuActive}
                toggleFun={toggleFun}
                menuactive={menuactive}
                loginType={loginType}
              />
              <div className="px-2 py-2 py-md-1 px-md-5">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* <Navbar isVisible={isVisible} /> */}
          {loginType ? <SideNavbar loginType={loginType} /> : <Header />}
          <div className={` ${isVisible ? "main-page" : "main-page2"}`}>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Layout1;
