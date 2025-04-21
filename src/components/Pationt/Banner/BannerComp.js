import React, { useEffect, useRef, useState } from "react";
import { bannerlist } from "../../../Data/DummyJson";
import {
  banner12,
  banner13,
  banners1,
  banners2,
  doctorlap,
  newbanner,
  newbanner2,
  newbanner3,
  newbanner4,
  newbanner5,
  newbanner6,
  newbanner7,
  stethescope4,
} from "../../../assets/image";
import LoginForm from "../../Login/LoginForm";
import ApponmentForm from "../Apponment/ApponmentForm";
import BeforeLoginForm from "../Apponment/BeforeLoginForm";
import { useNavigate } from "react-router-dom";

const BannerComp = () => {
  const [index, setIndex] = useState(0);
  const slidesRef = useRef(null);
  const navigate = useNavigate();
  const login = false;

  const next = () => {
    if (slidesRef.current) {
      const slides = slidesRef.current.querySelectorAll(".slide");
      slides[index].classList.remove("active");
      const nextIndex = (index + 1) % slides.length;
      setIndex(nextIndex);
      slides[nextIndex].classList.add("active");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      next();
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer to prevent memory leaks
  }, [index]);

  const backgrounds = [newbanner3, newbanner6, newbanner5, newbanner7];
  // const backgrounds = [newbanner5];
  return (
    <div
      style={{
        background: `url(${
          backgrounds[index % backgrounds?.length]
        }) no-repeat`,
        transition: "background 0.5s ease-in-out",
        backgroundSize: "cover",
      }}
      className="new-banner p-4 p-md-5"
    >
      <div className="imglayess" />
      <div ref={slidesRef} className="d-flex ac-jc">
        {bannerlist?.map((item, ind) => {
          return (
            <div
              key={ind}
              className={`slide ${ind === index ? "active" : ""} gap-5`}
            >
              <div className="content">
                <div className="textbg">
                  <span
                    style={{ textShadow: "2px 2px 4px #ffffff" }}
                    className="primary first-l f3 fs-xxl-50 fs-xl-49 fs-lg-48 fs-sm-47 fs-xs-25"
                  >
                    {item?.head.charAt(0)}
                  </span>
                  <span
                    style={{ textShadow: "2px 2px 4px #ffffff" }}
                    className="primary first-l f3 fs-xxl-38 fs-xl-37 fs-lg-36 fs-sm-30 fs-xs-20"
                  >
                    {item?.head.slice(1)}
                  </span>
                </div>
                <div className="textbg1">
                  <h3
                    style={{ textShadow: "2px 2px 4px #5c132b" }}
                    className="white f2 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15"
                  >
                    {item?.para}
                  </h3>
                </div>
                <div className="textbg2 mt-3">
                  <button
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="appoinment-btn border-0 white f2 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 lh-lg rounded-3"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {login ? <ApponmentForm /> : <BeforeLoginForm />}
    </div>
  );
};

export default BannerComp;
