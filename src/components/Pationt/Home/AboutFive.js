import React from "react";
import { step1, step2, step3, step4 } from "../../../assets/image";

const AboutFive = () => {
  return (
    <div className="d-flex ac-jc p-1 mt-2 mt-md-3 px-md-5 flex-column">
      <p class="dark_primary mb-0 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16">
        Simple Process
      </p>
      <p class="primary text-center mb-0  text-w f3 fs-xxl-38 fs-xl-37 fs-lg-36 fs-sm-35 fs-xs-30">
        How it helps you stay strong
      </p>
      <div className="steps-cont d-flex ac-jb w-100 flex-wrap flex-column flex-md-row mt-5 gap-5">
        <div className="steps d-flex ac-jc flex-column">
          <div className="img-layer">
            <img src={step1} />
            <div className="topround d-flex ac-jc">
              <p className="mb-0 white f3 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11">
                01
              </p>
            </div>
          </div>
          <div className="w-100">
            <p className="mb-1 black f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 text-center">
              Book an Appointment
            </p>
            <p className="mb-0 gray_text w-90 f2 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 text-center">
              Schedule your visit easily through our platform.
            </p>
          </div>
        </div>
        <div className="steps d-flex ac-jc flex-column">
          <div className="img-layer">
            <img src={step2} />
            <div className="topround d-flex ac-jc">
              <p className="mb-0 white f3 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11">
                02
              </p>
            </div>
          </div>
          <div className="w-100">
            <p className="mb-1 black f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 text-center">
              Choose Your Doctor
            </p>
            <p className="mb-0 gray_text w-90 f2 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 text-center">
              Select from our experienced medical professionals
            </p>
          </div>
        </div>
        <div className="steps d-flex ac-jc flex-column">
          <div className="img-layer">
            <img src={step3} />
            <div className="topround d-flex ac-jc">
              <p className="mb-0 white f3 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11">
                03
              </p>
            </div>
          </div>

          <div className="w-100">
            <p className="mb-1 black f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 text-center">
              Consultation & Diagnosis
            </p>
            <p className="mb-0 gray_text w-90 f2 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 text-center">
              Get expert advice and personalized treatment plans.
            </p>
          </div>
        </div>
        <div className="steps d-flex ac-jc flex-column">
          <div className="img-layer">
            <img src={step4} />
            <div className="topround d-flex ac-jc">
              <p className="mb-0 white f3 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11">
                04
              </p>
            </div>
          </div>

          <div className="w-100">
            <p className="mb-1 black f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 text-center">
              Start Your Recovery
            </p>
            <p className="mb-0 gray_text f2 w-90 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 text-center">
              Follow prescribed care and improve your well-being
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFive;
