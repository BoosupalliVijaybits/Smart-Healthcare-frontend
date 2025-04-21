import React from "react";
import {
  about_guarantee,
  girldoctor,
  opration,
  team,
} from "../../../assets/image";
import { useNavigate } from "react-router-dom";

const AboutTopComp = () => {
  const navigate = useNavigate();
  return (
    <div className="about-first w-100 d-flex flex-column flex-md-row">
      <div className="image-cont d-flex ac-jc pt-5">
        <img src={girldoctor} />
      </div>
      <div className="content pt-5 px-md-5 mx-md-5 px-4 text-md-start text-center">
        <div>
          <p className="dark_primary mb-0 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16">
            Visit Our Clinics
          </p>
          <p className="primary text-md-start text-center mb-0  f3 fs-xxl-38 fs-xl-37 fs-lg-22 fs-sm-21 fs-xs-20">
            A Trusted Destination for Quality Healthcare
          </p>
          <p className="mb-0 gray_text f1 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11">
            Whether you need a routine check-up, specialized treatment, or
            emergency care, our expert medical team is here to serve you.
          </p>
        </div>
        <div className="box-cont mt-4 gap-2 gap-md-5 d-flex flex-column flex-md-row">
          <div className="iner-box px-2 px-md-3 py-2 py-md-4 rounded-4 d-flex ac-js">
            <div className="img-layer">
              <img src={about_guarantee} />
            </div>
            <div className="cont w-100 d-flex as-jc flex-column ps-3">
              <p className="mb-1 black f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                Qualified Doctors
              </p>
              <p className="mb-0 gray_text f2 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11">
                Visit Our Clinics
              </p>
            </div>
          </div>
          <div className="iner-box px-2 px-md-3 py-2 py-md-4 rounded-4 d-flex ac-js">
            <div className="img-layer">
              <img src={team} />
            </div>
            <div className="cont w-100 d-flex as-jc flex-column ps-3">
              <p className="mb-1 black f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                Expert Medical Team
              </p>
              <p className="mb-0 gray_text f2 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11">
                Visit Our Clinics
              </p>
            </div>
          </div>
        </div>
        <p className="my-4 black f2 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11">
          We prioritize your health with advanced medical technology and a
          patient-centric approach.
        </p>
        <button
          onClick={() => {
            navigate("/patient/doctors");
            // navigate("/patient/doctors");
          }}
          className="join-btn2 px-4 border-0 rounded-2 white f3 mb-4 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15"
        >
          Make an Appointment
        </button>
      </div>
    </div>
  );
};

export default AboutTopComp;
