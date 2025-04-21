import React from "react";
import SigleBanner from "../../components/Pationt/Banner/SigleBanner";
import ContactComp from "../../components/Contact/ContactComp";
import ContactFormComp from "../../components/Contact/ContactFormComp";

const ContactScreen = () => {
  return (
    <div className="w-100 about-section">
      <SigleBanner
        heading={"Contact us"}
        listone={"Home"}
        listtwo={"Contact"}
        nav={"/home"}
      />
      <ContactComp />
      <div className="contact pb-4">
        <ContactFormComp />
      </div>
    </div>
  );
};

export default ContactScreen;
