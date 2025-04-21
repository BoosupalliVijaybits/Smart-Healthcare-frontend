import React, { useRef, useState } from "react";
import BannerComp from "../../components/Pationt/Banner/BannerComp";
import AboutSecond from "../../components/About/AboutSecond";
import AboutTopComp from "../../components/About/AboutTopComp";
import AboutThird from "../../components/About/AboutThird";
import AboutFoure from "../../components/About/AboutFoure";
import AboutFive from "../../components/About/AboutFive";

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const slidesRef = useRef(null);

  // Api

  const next = () => {
    if (slidesRef.current) {
      const slides = slidesRef.current.querySelectorAll(".slide");
      slides[index].classList.remove("active");
      const nextIndex = (index + 1) % slides.length;
      setIndex(nextIndex);
      slides[nextIndex].classList.add("active");
    }
  };

  const prev = () => {
    if (slidesRef.current) {
      const slides = slidesRef.current.querySelectorAll(".slide");
      slides[index].classList.remove("active");
      const prevIndex = (index - 1 + slides.length) % slides.length;
      setIndex(prevIndex);
      slides[prevIndex].classList.add("active");
    }
  };

  return (
    <div className="home-cont">
      <BannerComp />
      <AboutThird />
      <AboutSecond />
      <div className="emty-box" style={{ height: "200px" }} />
      <AboutTopComp />
      <AboutFoure />
      <AboutFive />
    </div>
  );
};

export default HomeScreen;
