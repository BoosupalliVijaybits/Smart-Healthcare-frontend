import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { usePriscribe_addMutation } from "../../../Data/Api/api";
import PageLoad from "../../Loading/PageLoad";

const AddPrescription = ({ formToggle, addPrescription, loading }) => {
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    timeToTake: "",
    medicationTime: [],
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});
  const todayDate = new Date().toISOString().split("T")[0];

  // Api
  const [priscribeAddApi] = usePriscribe_addMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validation
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key] ||
        (Array.isArray(formData[key]) && formData[key].length === 0)
      ) {
        newErrors[key] = "This field is required";
      }
    });

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addPrescription(formData); // Add prescription to the table
      // formToggle(); // Close the form
    }
  };

  const addPricriptionFeald = [
    {
      label: "Medicine Name",
      name: "medicationName",
      type: "text",
      placeholder: "Enter medicine name",
    },
    {
      label: "Dosage",
      name: "dosage",
      type: "text",
      placeholder: "Enter dosage (e.g., 2 tablets)",
    },
    {
      label: "Time to Take",
      name: "timeToTake",
      type: "select",
      options: ["BEFORE_FOOD", "AFTER_FOOD"],
    },
    {
      label: "Medication Time",
      name: "medicationTime",
      type: "checkbox",
      check: ["MORNING", "AFTERNOON", "NIGHT"],
    },
    {
      label: "Start Date",
      name: "startDate",
      type: "date",
      min: todayDate,
    },
    {
      label: "End Date",
      name: "endDate",
      type: "date",
      min: formData.startDate || todayDate,
    },
  ];

  return (
    <div className="prescrip-pop d-flex ac-jc">
      {loading && <PageLoad />}
      <div className="form-cont w-md-40 w-90 rounded-4 d-flex flex-column ac-jc py-3">
        <div className="d-flex ac-je w-100 px-md-5 px-3">
          <button
            onClick={formToggle}
            className="inner-btn border-0 bg-transparent d-flex ac-jc"
          >
            <CloseOutlinedIcon className="primary f3 fs-2" />
          </button>
        </div>
        <div className="d-flex ac-jc flex-column w-100  gap-md-3 px-md-5 px-3 gap-2">
          <div className="main-formcont gap-md-2 gap-2 d-flex ac-js flex-column flex-wrap w-100">
            {addPricriptionFeald?.map(
              ({ label, name, type, placeholder, min, options, check }) => (
                <div key={name} className="w-md-45 w-100 position-relative">
                  <p className="mb-1 text-left light_gray fs-xxl-14 fs-xl-14 fs-lg-14 fs-md-13 fs-sm-13 fs-xs-12 textani">
                    {label}
                  </p>

                  {type === "select" ? (
                    <select
                      className="w-100 px-3 black py-md-2 py-2 f1 black fs-xxl-15 fs-xl-15 fs-lg-15 fs-md-14 fs-sm-14 fs-xs-13 textani"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : type === "checkbox" ? (
                    <div className="w-100 d-flex flex-wrap gap-3">
                      {check?.map((option) => (
                        <label
                          key={option}
                          className="f1 black fs-xxl-15 fs-xl-15 fs-lg-15 fs-md-14 fs-sm-14 fs-xs-13 textani d-flex ac gap-2"
                        >
                          <input
                            type="checkbox"
                            name={name}
                            value={option}
                            checked={formData[name]?.includes(option)}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const updated = isChecked
                                ? [...formData[name], option]
                                : formData[name].filter(
                                    (item) => item !== option
                                  );

                              setFormData({ ...formData, [name]: updated });
                              setErrors({ ...errors, [name]: "" });
                            }}
                            style={{
                              boxShadow: "none",
                            }}
                            className="bg-transparent border-0 "
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      className="w-100 px-3 black py-md-2 py-2 f1 black fs-xxl-15 fs-xl-15 fs-lg-15 fs-md-14 fs-sm-14 fs-xs-13 textani"
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      min={min}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                  )}

                  {errors[name] && (
                    <div className="error-cont">
                      <p className="mb-1 text-left w-100 text-danger f2 fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10 textani">
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
              Add Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrescription;
