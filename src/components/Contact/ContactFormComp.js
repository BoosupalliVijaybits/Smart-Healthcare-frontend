import React, { useState } from "react";
import { useContactusMutation } from "../../Data/Api/api";
import PageLoad from "../Loading/PageLoad";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContactFormComp = () => {
  const navigation = useNavigate();
  const [contactusApi] = useContactusMutation();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Phone is required";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          error = "Phone must be 10 digits";
        }
        break;
      case "subject":
        if (!value.trim()) error = "Subject is required";
        break;
      case "message":
        if (!value.trim()) error = "Message is required";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // Real-time validation
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.entries(formData).forEach(([key, value]) =>
      validateField(key, value)
    );

    const hasErrors = Object.values(errors).some((err) => err !== "");
    const hasEmptyFields = Object.values(formData).some(
      (val) => val.trim() === ""
    );

    if (!hasErrors && !hasEmptyFields) {
      setLoading(true);
      const payload = {
        name: formData?.name,
        email: formData?.email,
        subject: formData?.subject,
        mobile: formData?.phone,
        message: formData?.message,
      };
      contactusApi(payload)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          toast.success(
            res?.message ||
              `Thanks for reaching out! We'll get back to you soon.`
          );
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
          setErrors({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
          navigation("/");
        })
        .catch((err) => {
          console.log("Err", err);
          toast.error(err?.status || "");
        })
        .finally(() => {
          setLoading(false);
        });
      console.log("resSubmitted:", payload);
    }
  };

  return (
    <>
      {loading && <PageLoad />}
      <div className="rowss p-3 p-md-5 d-flex flex-column flex-md-row pt-md-3 w-100 ac-jb">
        <form className="px-3 px-md-5 w-100 w-md-50" onSubmit={handleSubmit}>
          <p className="dark_primary mb-0 f3 fs-xxl-20 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-16">
            Get In Touch
          </p>

          <div className="inputBox flex-column flex-md-row w-100 w-md-50 gap-2">
            <div className="w-100 position-relative">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter Your Name"
                className="box f2 px-2 px-md-3 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11 black  w-100 w-md-100"
              />
              {errors.name && (
                <div className="error-contss">
                  <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                    {errors.name}
                  </p>
                </div>
              )}
            </div>

            <div className="w-100 position-relative">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                placeholder="Enter Your Email"
                className="box f2 px-2 px-md-3 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11 black  w-100 w-md-100"
              />
              {errors.email && (
                <div className="error-contss">
                  <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                    {errors.email}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="inputBox flex-column flex-md-row w-100 w-md-50 gap-2">
            <div className="w-100 position-relative">
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                placeholder="Enter Your Number"
                className="box f2 px-2 px-md-3 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11 black  w-100 w-md-100"
              />
              {errors.phone && (
                <div className="error-contss">
                  <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                    {errors.phone}
                  </p>
                </div>
              )}
            </div>

            <div className="w-100 position-relative">
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter Your Subject"
                className="box f2 px-2 px-md-3 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11 black  w-100 w-md-100"
              />
              {errors.subject && (
                <div className="error-contss">
                  <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                    {errors.subject}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-100 mt-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className="f2 px-3 fs-xxl-14 black w-100"
              placeholder="Your Message"
              cols="30"
              rows="5"
            ></textarea>
            {errors.message && (
              <div className="error-contss">
                <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors.message}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="join-btn border-0 rounded-2 white mb-4 f3 fs-xxl-20"
          >
            Send Message
          </button>
        </form>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.8864338434746!2d80.27822205!3d13.0810438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5268aaa362f12b%3A0x5ea55571bffec0eb!2sRAJIV%20GANDHI%20GOVERNMENT%20GENERAL%20HOSPITAL%2C%203%2C%20Grand%20Southern%20Trunk%20Rd%2C%20near%20Park%20Town%2C%20Near%20Chennai%20Central%2C%20Park%20Town%2C%20Chennai%2C%20Tamil%20Nadu%20600003!5e1!3m2!1sen!2sin!4v1744818816084!5m2!1sen!2sin"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="map-view"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31071.305373729476!2d80.10702877451418!3d13.230765453904707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a527dbe9ed7d5df%3A0xdca8159ce294ce1d!2sNew%20Erumaivettipalayam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1679206491501!5m2!1sen!2sin"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="map-view"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}
      </div>
    </>
  );
};

export default ContactFormComp;
