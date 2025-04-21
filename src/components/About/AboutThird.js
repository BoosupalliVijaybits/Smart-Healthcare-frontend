import React from "react";
import {
  doctor1,
  doctor2,
  doctor3,
  doctor4,
  doctor5,
} from "../../assets/image";
import { useNavigate } from "react-router-dom";

const AboutThird = () => {
  const navigate = useNavigate();
  return (
    <div className="about-three">
      <div className="content-sec p-md-5 p-4">
        <p className="dark_primary mb-0 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16">
          Meet Our Team
        </p>
        <p className="primary mb-0 f3 fs-xxl-38 fs-xl-37 fs-lg-36 fs-sm-35 fs-xs-25">
          Group of Certified & Experienced Doctors.
        </p>
        <p className="mb-0 gray_text f1 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 ">
          Welcome to the Smart Healthcare Management System! Your health is our
          priority, and we are committed to providing seamless healthcare
          services at your fingertips.
        </p>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="join-btn border-0 rounded-2 white  mt-4 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-13"
        >
          Make Appointment
        </button>
      </div>
      <div className="team-circle ">
        <div className="d-flex ac-jc flex-column text-center">
          <div className="d-flex ac-jc flex-row py-1 p-md-3 gap-md-1 gap-4">
            <div className="img-box-met">
              <img src={doctor1} />
              <div className="over-lay">
                <p className="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f4 text-center mb-0">
                  Aahika Harlalka
                </p>
                <p className="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f2 text-center mb-0">
                  Co-founder
                </p>
              </div>
            </div>
            <div className="img-box-met">
              <img src={doctor2} />
              <div className="over-lay">
                <p className="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f4 text-center mb-0">
                  Aahika Harlalka
                </p>
                <p className="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f2 text-center mb-0">
                  Co-founder
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex ac-jc flex-row p-3">
            <div className="img-box-met">
              <img className="" src={doctor3} />
              <div className="over-lay">
                <p class="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f4 text-center mb-0">
                  Roger Daniel
                </p>
                <p class="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f2 text-center mb-0">
                  Co-founder
                </p>
              </div>
            </div>
            <div className="img-box-met">
              <img className="" src={doctor4} />
              <div className="over-lay">
                <p class="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f4 text-center mb-0">
                  Roger Daniel
                </p>
                <p class="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f2 text-center mb-0">
                  Co-founder
                </p>
              </div>
            </div>
            <div className="img-box-met">
              <img className="" src={doctor5} />
              <div className="over-lay">
                <p class="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f4 text-center mb-0">
                  Roger Daniel
                </p>
                <p class="text-white fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-8 f2 text-center mb-0">
                  Co-founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutThird;
