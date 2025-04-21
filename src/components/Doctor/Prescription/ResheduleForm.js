import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ResheduleForm = ({ formToggle }) => {
  const [formData, setFormData] = useState({
    sheduleData: "",
    sheduleTime: "",
  });

  const [errors, setErrors] = useState({});
  const todayDate = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    // Validation
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      formToggle(); // Close the form
    }
  };

  const addPricriptionFeald = [
    {
      label: "Reschedule Date",
      name: "sheduleData",
      type: "date",
      min: todayDate,
    },
    {
      label: "Reschedule Time",
      name: "sheduleTime",
      type: "time",
      min: formData.sheduleData || todayDate,
    },
  ];

  return (
    <div className="prescrip-pop d-flex ac-jc">
      <div className="form-cont w-md-60 w-90 rounded-4">
        <button
          onClick={formToggle}
          className="inner-btn border-0 bg-transparent"
        >
          <CloseOutlinedIcon className="primary f3 fs-2" />
        </button>
        <div className="d-flex ac-jc flex-column w-100 p-md-5 p-3 gap-md-5 gap-4">
          <div className="main-formcont gap-md-4 gap-2 d-flex ac-jc flex-wrap w-100">
            {addPricriptionFeald?.map(
              ({ label, name, type, placeholder, min }) => (
                <div key={name} className="w-md-45 w-90 position-relative">
                  <p className="mb-1 text-left light_gray fs-xxl-14 fs-xl-14 fs-lg-14 fs-md-13 fs-sm-13 fs-xs-12 textani">
                    {label}
                  </p>
                  <input
                    className="w-100 px-3 black py-md-2 py-2 f1 black fs-xxl-15 fs-xl-15 fs-lg-15 fs-md-14 fs-sm-14 fs-xs-13 textani"
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    min={min}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                  {errors[name] && (
                    <div className="error-cont">
                      <p className="mb-1 text-left w-100  text-danger f2 fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10 textani">
                        {errors[name]}
                      </p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
          <div className="w-100 text-center">
            <button
              className="submit-btnss border-0 bg-primarys px-3 rounded-3 white f2 py-2 px-2 fs-xxl-14 fs-xl-14 fs-lg-14 fs-md-13 fs-sm-13 fs-xs-12 textani"
              onClick={handleSubmit}
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResheduleForm;
