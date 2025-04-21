import React from "react";

const ContactComp = () => {
  return (
    <section class="contact">
      <div class="icons-container p-md-5 p-3">
        <a
          style={{ textDecoration: "none" }}
          class="icons cp"
          href="tel:+919901707113"
        >
          <i class="fas fa-phone"></i>
          <h3 className="dark_primary mb-0 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16">
            our number
          </h3>
          <p className="mb-0 gray_text f1 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 ">
            +91 9901707113
          </p>
          {/* <p className="mb-0 gray_text f1 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 ">
            +91 6675457989
          </p> */}
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=bnjreddy928@gmail.com"
          target="_blank"
          style={{ textDecoration: "none" }}
          class="icons cp"
        >
          <i class="fas fa-envelope"></i>
          <h3 className="dark_primary mb-0 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16">
            our email
          </h3>
          <p className="mb-0 gray_text f1 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 ">
            bnjreddy928@gmail.com
          </p>
          {/* <p className="mb-0 gray_text f1 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 ">
            sagi@gmail.com
          </p> */}
        </a>
        <a
          href="https://www.google.com/maps?q=RAJIV+GANDHI+GOVERNMENT+GENERAL+HOSPITAL+3,+Grand+Southern+Trunk+Rd,+near+Park+Town,+Near+Chennai+Central,+Park+Town,+Chennai,+Tamil+Nadu+600003"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
          class="icons cp"
        >
          <i class="fas fa-map-marker-alt"></i>
          <h3 className="dark_primary mb-0 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16">
            our address
          </h3>
          <p className="mb-0 gray_text f1 fs-xxl-15 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-11 ">
            RAJIV GANDHI GOVERNMENT GENERAL HOSPITAL 3, Grand Southern Trunk Rd,
            near Park Town, Near Chennai Central, Park Town, Chennai, Tamil Nadu
            600003
          </p>
        </a>
      </div>
    </section>
  );
};

export default ContactComp;
