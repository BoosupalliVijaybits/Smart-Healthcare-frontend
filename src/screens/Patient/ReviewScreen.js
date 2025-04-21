import React from "react";
import SigleBanner from "../../components/Pationt/Banner/SigleBanner";
import ReviewComp from "../../components/Pationt/Review/ReviewComp";
import ReviewPeople from "../../components/Pationt/Review/ReviewPeople";

const ReviewScreen = () => {
  return (
    <div className="w-100 about-section ">
      <SigleBanner
        heading={"Client's Review"}
        listone={"Home"}
        listtwo={"Review"}
        nav={"/home"}
      />
      <ReviewComp />
      <ReviewPeople />
    </div>
  );
};

export default ReviewScreen;
