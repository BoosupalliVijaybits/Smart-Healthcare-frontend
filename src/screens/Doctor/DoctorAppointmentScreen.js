import React, { useState } from "react";
import AppoinmentList from "../../components/Doctor/Appoinment/AppoinmentList";
import AppoinmentTop from "../../components/Doctor/Appoinment/AppoinmentTop";
import {
  completeAppoinment,
  postAppoinment,
  todayAppoinment,
} from "../../Data/DummyJson";

const DoctorAppointmentScreen = () => {
  const [toggle, setToggle] = useState(1);

  const toggleFun = (item) => {
    setToggle(item?.id);
  };
  return (
    <div>
      {/* <AppoinmentTop toggleFun={toggleFun} toggle={toggle} /> */}
      <p
        className={
          "border-0 rounded-3 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15  fs-xs-14 textani"
        }
      >
        Patients
      </p>
      <AppoinmentList
        data={
          toggle == 1
            ? todayAppoinment
            : toggle == 2
            ? postAppoinment
            : toggle == 3
            ? completeAppoinment
            : null
        }
      />
    </div>
  );
};

export default DoctorAppointmentScreen;
