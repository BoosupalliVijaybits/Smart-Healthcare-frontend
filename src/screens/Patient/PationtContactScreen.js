import React from "react";
import ContactComp from "../../components/Contact/ContactComp";
import ContactFormComp from "../../components/Contact/ContactFormComp";

const PationtContactScreen = () => {
  return (
    <div className="w-100 about-section">
      {/* <p className="text-uppercase primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
        Contact Us
      </p> */}
      <ContactComp />
      <div className="contact pb-4">
        <ContactFormComp />
      </div>
    </div>
  );
};

export default PationtContactScreen;
