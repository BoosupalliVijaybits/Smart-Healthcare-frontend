import React from "react";
import { clint_review } from "../../../Data/DummyJson";

const ReviewPeople = () => {
  return (
    <section class="review p-md-5 p-4">
      {clint_review?.map((item) => {
        return (
          <div class="box mb-md-0 mb-2 p-3 p-md-5">
            <div class="user d-flex flex-column flex-sm-row mb-md-2 mb-2">
              <img src={item?.img} alt="" />
              <div class="info">
                <h3 className="black f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16">
                  {item?.name}
                </h3>
                <span className="f1 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16">
                  {item?.dis}
                </span>
              </div>
            </div>
            <p className="f1 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11">
              {item?.para}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default ReviewPeople;
