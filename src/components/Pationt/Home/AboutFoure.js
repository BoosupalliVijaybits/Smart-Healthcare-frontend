import React from "react";
import {
  doctor1,
  doctor2,
  doctor3,
  doctor4,
  doctor5,
} from "../../../assets/image";

const AboutFoure = () => {
  const testimonials = [
    {
      name: "Priya",
      feedback: "Amazing service! Highly recommended.",
      image: doctor3,
    },
    {
      name: "Jane Smith",
      feedback: "Very satisfied with the quality.",
      image: doctor4,
    },
    {
      name: "Sam Wilson",
      feedback: "Excellent customer support and fast delivery.",
      image: doctor5,
    },
    {
      name: "keerthi",
      feedback: "Excellent customer support and fast delivery.",
      image: doctor2,
    },
    {
      name: "keerthi",
      feedback: "Excellent customer support and fast delivery.",
      image: doctor2,
    },
    {
      name: "keerthi",
      feedback: "Excellent customer support and fast delivery.",
      image: doctor2,
    },
  ];
  return (
    <div className="about-foure d-flex flex-column gap-3 gap-md-4 flex-md-row p-md-5 p-3">
      <div className="bg-layer" />
      <div className="leftcont w-100 w-md-50 d-flex flex-column as-jc flex-wrap">
        <p
          style={{ textShadow: "1px 1px 1px #000" }}
          className="dark_primary text-md-start text-center mb-0 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16"
        >
          Testimonials
        </p>
        <p
          style={{ textShadow: "1px 1px 2px #000" }}
          className="white text-md-start text-center mb-0 text-w f3 fs-xxl-38 fs-xl-37 fs-lg-22 fs-sm-22 fs-xs-20"
        >
          What people say about medical health care
        </p>
      </div>
      <div className="rightcont w-100 w-md-50">
        <div className="testimonials-container gap-1 gap-md-4">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <img
                src={testimonial?.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
              <h3 className="mb-0 white f3 fs-xxl-15 mt-2 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 ">
                {testimonial.name}
              </h3>
              <p
                style={{ opacity: 0.8 }}
                className="mb-0 white f1 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 "
              >
                {testimonial.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutFoure;
