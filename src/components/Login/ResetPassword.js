import React, { useState } from "react";
import { no_view, view } from "../../assets/image";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useLogoutMutation,
  useResetpasswordMutation,
} from "../../Data/Api/api";
import { saveBackHandler } from "../../Data/Redux/slice/backHandler";
import { useDispatch } from "react-redux";
import useUser from "../../Data/Local/userDetail";

const ResetPassword = ({ setLoad, type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dicpatch = useDispatch();
  const token = location?.search;
  const { user, setUser } = useUser();

  const [passwordShow, setPasswordShow] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  // Api
  const [logoutApi] = useLogoutMutation();

  const togglePasswordVisibility = (field) => {
    setPasswordShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [formFeald, setFormFeald] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  // Api
  const [resetPassword] = useResetpasswordMutation();

  const fealdOnChange = (field, value) => {
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };

  const validateInput = (field, value) => {
    let errorMsg = "";
    const stringValue = String(value).trim();

    switch (field) {
      case "newpassword":
        if (!stringValue) {
          errorMsg = "New password is required!";
        } else if (stringValue.length < 6) {
          errorMsg = "Password must be at least 6 characters!";
        } else if (!/[A-Z]/.test(stringValue)) {
          errorMsg = "Include at least one uppercase letter!";
        } else if (!/[a-z]/.test(stringValue)) {
          errorMsg = "Include at least one lowercase letter!";
        } else if (!/[0-9]/.test(stringValue)) {
          errorMsg = "Include at least one number!";
        } else if (!/[@$!%*?&]/.test(stringValue)) {
          errorMsg = "Include at least one special character!";
        }
        break;

      case "confirmpassword":
        if (!stringValue) {
          errorMsg = "Confirm password is required!";
        } else if (stringValue !== formFeald.newpassword) {
          errorMsg = "Passwords do not match!";
        }
        break;

      default:
        break;
    }

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
        newPassword: formFeald?.confirmpassword,
      };
      console.log("payload", payload, token);
      resetPassword({ payload: payload, token: token })
        .unwrap()
        .then((res) => {
          console.log("res", res);
          toast.success(
            res?.message ? res?.message : "Password reset successfully!"
          );
          navigate("/login");
          setUser(null);
          window.location.reload();
          logoutApi()
            .unwrap()
            .then((res) => {
              dicpatch(saveBackHandler(true));
              setUser(null);
              console.log("Logoutres", res);
            })
            .catch((err) => {
              dicpatch(saveBackHandler(true));
              setUser(null);
            });
        })
        .catch((err) => {
          console.log("Err", err);
          toast.error(
            err?.data?.message ? err?.data?.message : "Invalid or expired token"
          );
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };
  return (
    <>
      <div className="login-right container">
        <div className="big-cont d-flex ac-jc">
          <p className="text-dark f3 text-center fs-4 ">Reset Password</p>
        </div>
        <div className="container gap-4 w-100 d-flex ac-jc flex-column">
          <div className=" droplayer d-flex ac-js flex-column ">
            <p className="mb-1 text-left w-100 light_gray f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
              New password
            </p>
            <div className="drop-cont d-flex w-100 ac-js">
              <input
                // onFocus={() => {
                //   setDropToggle(false);
                // }}
                type={passwordShow.newPassword ? "text" : "password"}
                className="input-cont w-100 px-3 f2 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
                placeholder="Password"
                value={formFeald?.newpassword}
                onChange={(e) => fealdOnChange("newpassword", e.target.value)}
              />
              <button
                onClick={() => togglePasswordVisibility("newPassword")}
                className="dropdown2 d-flex ac-jc pe-4"
              >
                <img
                  alt={"img"}
                  src={passwordShow?.newPassword ? view : no_view}
                  className="drop-icon"
                />
              </button>
            </div>
            {errors?.newpassword && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100 text-danger f2 fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors?.newpassword}
                </p>
              </div>
            )}
          </div>
          <div className=" droplayer d-flex ac-js flex-column ">
            <p className="mb-1 text-left w-100 light_gray f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
              Confirm new password
            </p>
            <div className="drop-cont d-flex w-100 ac-js">
              <input
                // onFocus={() => {
                //   setDropToggle(false);
                // }}
                type={passwordShow?.confirmPassword ? "text" : "password"}
                className="input-cont w-100 px-3 f2 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
                placeholder="Password"
                value={formFeald?.confirmpassword}
                onChange={(e) =>
                  fealdOnChange("confirmpassword", e.target.value)
                }
              />
              <button
                onClick={() => {
                  togglePasswordVisibility("confirmPassword");
                }}
                className="dropdown2 d-flex ac-jc pe-4"
              >
                <img
                  alt={"img"}
                  src={passwordShow?.confirmPassword ? view : no_view}
                  className="drop-icon"
                />
              </button>
            </div>
            {errors?.confirmpassword && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100  text-danger f2 fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors?.confirmpassword}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-100 d-flex flex-column ac-jc gap-3 mt-4">
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
    </>
  );
};

export default ResetPassword;
