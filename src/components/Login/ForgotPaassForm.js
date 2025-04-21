import React, { useState } from "react";
import { emailsended, no_view, view } from "../../assets/image";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForgotpasswordMutation } from "../../Data/Api/api";
import { useDispatch, useSelector } from "react-redux";
import { saveForgotPassword } from "../../Data/Redux/slice/ForgotPasswordSlice";

const ForgotPassForm = ({ setLoad, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgotpassdata = useSelector((state) => state?.forgotPassword);
  console.log("forgotpassdata", forgotpassdata);

  const [formFeald, setFormFeald] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

  // Forgot Password
  const [forgotPasswordApi] = useForgotpasswordMutation();

  const fealdOnChange = (field, value) => {
    console.log("field, value", field, value);
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };

  const validateInput = (field, value) => {
    let errorMsg = "";
    const stringValue = String(value).trim();
    console.log("stringValue", stringValue);

    switch (field) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!stringValue) {
          errorMsg = "Email is required!";
        } else if (!emailRegex.test(stringValue)) {
          errorMsg = "Enter a valid Email";
        }
        break;
    }

    console.log("errorMsg", errorMsg);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg,
    }));

    return !errorMsg;
  };

  const submitHandler = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      setLoad(true);
      const payload = {
        email: formFeald?.email,
      };
      forgotPasswordApi(payload)
        .unwrap()
        .then((res) => {
          console.log("Ress", res);
          dispatch(saveForgotPassword(res));
          toast.success(
            res?.message ? res?.message : "Reset password email sent!"
          );
        })
        .catch((err) => {
          console.log("Err", err);
          toast.error(
            err?.data?.message
              ? err?.data?.message
              : err?.status
              ? err?.status
              : "BAD_REQUEST"
          );
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };

  return (
    <>
      {forgotpassdata == null ? (
        <div className="login-right container d-flex ac-jc flex-column">
          <div className="big-cont d-flex ac-jc">
            <p className="text-dark f3 text-center fs-4 ">Forgot Password</p>
          </div>
          <div className="d-flex flex-column ac-jc w-100">
            <div className="container gap-4 w-100 d-flex ac-jc flex-column">
              <div className=" droplayer d-flex ac-js flex-column ">
                <p className="mb-1 text-left w-100 light_gray f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                  Email
                </p>
                <div className="drop-cont d-flex w-100 ac-js">
                  <input
                    type={"email"}
                    className="input-cont w-100 f2 px-3 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
                    placeholder="Enter your email"
                    value={formFeald?.email}
                    onChange={(e) => fealdOnChange("email", e.target.value)}
                  />
                </div>
                {errors?.email && (
                  <div className="error-cont">
                    <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                      {errors?.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-100 d-flex flex-column ac-jc gap-3 mt-3">
              <button
                onClick={() => {
                  submitHandler();
                }}
                className="d-flex ac-jc btn-cont border-0 rounded-4 gap-2"
              >
                <p className="mb-0 white f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                  Sumbit
                </p>
              </button>
              {type == "user" ? null : (
                <a
                  href=""
                  onClick={() => {
                    navigate("/register");
                  }}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                  className="primary f1 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                >
                  Don’t have an account?
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex ac-jc w-100 flex-column">
          {/* <button
              onClick={() => window.open("https://mail.google.com", "_blank")}
            >
              Go to Gmail
            </button> */}
          <div className="giflayer">
            <img src={emailsended} />
          </div>
          <p className="primary text-center f2 fs-xxl-20 fs-xl-20 fs-lg-18 fs-sm-17  fs-xs-15 textani">
            Password reset email sent successfully! <br />
            <span className="primary text-center f1 fs-xxl-17 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-14 textani">
              Please check your inbox
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default ForgotPassForm;
