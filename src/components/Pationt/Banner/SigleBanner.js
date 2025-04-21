import React from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate, useNavigation } from "react-router-dom";

const SigleBanner = ({ heading, listone, listtwo, nav }) => {
  const navigate = useNavigate();
  return (
    <div className="top-cont d-flex ac-jc flex-column">
      <div className="blurr" />
      <div className="contsec">
        <h1
          style={{ textShadow: "1px 1px 2px #000" }}
          className="fs-1 f3 white "
        >
          {heading}
        </h1>
        <div className="d-flex ac-jc gap-2 opacity-2">
          <a
            onClick={() => {
              navigate(nav);
            }}
            style={{ textShadow: "1px 1px 2px #000" }}
            className="cp f3 white fs-xxl-20 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
          >
            {listone}
            <ArrowForwardIosOutlinedIcon
              style={{ textShadow: "1px 1px 2px #000" }}
              className="white fs-xxl-20 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
            />
          </a>
          <p
            style={{ textShadow: "1px 1px 2px #000" }}
            className="f2  white fs-xxl-20 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11 mb-0"
          >
            {listtwo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigleBanner;
