import React, { useState } from "react";

const ApponmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialist: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.specialist) newErrors.specialist = "Specialist is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Booking Data:", formData);
      // You can send API request here
    }
  };

  return (
    <div className="secondcont inhome d-flex ac-jc py-3">
      <div className="formconp d-flex flex-column ac-js p-4">
        <p className="white f3 text-center fs-4 mb-0">
          Book Your Apponment Today!
        </p>

        <div className="appoinment mt-3 w-100">
          {/* Name */}
          <div className="d-flex as-jc flex-column position-relative">
            <p className="white text-center mb-0">Name</p>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              className="primary w-100 appin px-2"
            />
            {errors.name && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors.name}
                </p>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="d-flex as-jc flex-column position-relative">
            <p className="white text-center mb-0">Email</p>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="primary w-100 appin px-2"
            />
            {errors.email && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors.email}
                </p>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="d-flex as-jc flex-column position-relative">
            <p className="white text-center mb-0">Phone No</p>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone no"
              className="primary w-100 appin px-2"
            />

            {errors.phone && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors.phone}
                </p>
              </div>
            )}
          </div>

          {/* Specialist */}
          <div className="d-flex as-jc flex-column position-relative">
            <p className="white text-center mb-0">Specialist</p>
            <select
              name="specialist"
              value={formData.specialist}
              onChange={handleChange}
              className="primary select w-100 px-2"
            >
              <option value="" disabled hidden>
                Select specialist
              </option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Psychiatrist">Psychiatrist</option>
            </select>
            {errors.specialist && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors.specialist}
                </p>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="d-flex as-jc flex-column position-relative">
            <p className="white text-center mb-0">Appointment Date</p>
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
              className="primary w-100 appin px-2"
            />
            {errors.date && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors.date}
                </p>
              </div>
            )}
          </div>

          {/* Time */}
          <div className="d-flex as-jc flex-column position-relative">
            <p className="white text-center mb-0">Appointment Time</p>
            <input
              name="time"
              value={formData.time}
              onChange={handleChange}
              type="time"
              className="primary w-100 appin px-2"
            />
            {errors.time && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors.time}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="btncont mt-3">
          <button
            onClick={handleSubmit}
            className="appbtn d-flex ac-jc mt-2 border-0 rounded-3 px-3"
          >
            <p className="mb-0 white">Book Appointment</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApponmentForm;
