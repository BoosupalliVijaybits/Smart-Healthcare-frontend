import React, { useEffect } from "react";
import AboutTopComp from "../../components/Pationt/Home/AboutTopComp";
import AboutFoure from "../../components/Pationt/Home/AboutFoure";
import AboutFive from "../../components/Pationt/Home/AboutFive";

const PationtHomeScreen = () => {
  return (
    <div className="pb-5">
      <AboutTopComp />
      <AboutFoure />
      <AboutFive />
    </div>
  );
};

export default PationtHomeScreen;
