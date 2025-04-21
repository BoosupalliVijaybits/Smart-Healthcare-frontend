import React from "react";
import SigleBanner from "../../components/Pationt/Banner/SigleBanner";
import AboutTopComp from "../../components/About/AboutTopComp";
import AboutSecond from "../../components/About/AboutSecond";
import AboutThird from "../../components/About/AboutThird";
import AboutFoure from "../../components/About/AboutFoure";
import AboutFive from "../../components/About/AboutFive";
import ContactComp from "../../components/Contact/ContactComp";

const AboutScreen = () => {
  return (
    <div className="w-100 about-section">
      <SigleBanner
        heading={"About Us"}
        listone={"Home"}
        listtwo={"About"}
        nav={"/home"}
      />
      <div>
        <AboutTopComp />
        <AboutSecond />
        <div className="emty-box" style={{ height: "200px" }} />
        <AboutThird />
        <AboutFoure />
        <AboutFive />
        <ContactComp />
      </div>
    </div>
  );
};

export default AboutScreen;
