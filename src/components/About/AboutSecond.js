import React from "react";
import { special_list } from "../../Data/DummyJson";
import { surgery } from "../../assets/image";

const AboutSecond = () => {
  return (
    <div className="w-100 about2">
      <div className="about-second w-100 d-flex  ac-jc flex-column">
        <div className="w-100 as-jc inner-sec d-flex bg-p p-2 p-md-5">
          <p
            style={{
              // width: "60%",
              textAlign: "center",
              // lineHeight: "60px",
            }}
            className="f3 white fs-xxl-38 fs-xl-37 fs-lg-36 fs-sm-35 fs-xs-25 mb-0"
          >
            Trust us to be there to help everyone and make things well again
          </p>
        </div>
        <div className="list-layer rounded-3">
          {special_list?.map((item, index) => {
            return (
              <div
                className={`boxlay d-flex ac-jc flex-column ${
                  (index + 1) % 2 === 0 ? "bg-primary1 bg-border" : ""
                }`}
              >
                <img src={item?.img ? item?.img : surgery} />
                <p
                  // style={{ textShadow: "1px 1px 2px #000" }}
                  className="mb-0 primary f2 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11"
                >
                  {item?.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutSecond;
