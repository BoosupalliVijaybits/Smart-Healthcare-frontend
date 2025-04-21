import React, { useState } from "react";
import { logintype } from "../../Data/DummyJson";
import { dropdown, no_view, view } from "../../assets/image";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUser from "../../Data/Local/userDetail";
import { useLoginMutation } from "../../Data/Api/api";
import { saveBackHandler } from "../../Data/Redux/slice/backHandler";
import { useDispatch } from "react-redux";

const LoginForm = ({ setLoad }) => {
  const navigate = useNavigate();
  const dicpatch = useDispatch();
  const { user, setUser } = useUser();

  console.log("useruserdd", user);

  const [droptoggle, setDropToggle] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const [formFeald, setFormFeald] = useState({
    // userType: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Api
  const [LoginApi] = useLoginMutation();

  const fealdOnChange = (field, value) => {
    console.log("field, value", field, value);
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };

  const dropdownToggle = () => {
    if (droptoggle) {
      setDropToggle(false);
    } else {
      setDropToggle(!droptoggle);
    }
  };

  const validateInput = (field, value) => {
    let errorMsg = "";
    const stringValue = String(value).trim();
    console.log("stringValue", stringValue);

    switch (field) {
      // case "userType":
      //   if (!stringValue) {
      //     errorMsg = "UserType is required!";
      //   }
      //   break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!stringValue) {
          errorMsg = "Email/Phone number is required!";
        } else if (
          !emailRegex.test(stringValue) &&
          !phoneRegex.test(stringValue)
        ) {
          errorMsg = "Enter a valid Email or Phone Number!";
        }
        break;
      case "password":
        if (!stringValue) {
          errorMsg = "Password is required!";
        } else if (stringValue.length < 6) {
          errorMsg = "Password must be at least 6 characters long!";
        } else if (!/[A-Z]/.test(stringValue)) {
          errorMsg = "Password must contain at least one uppercase letter!";
        } else if (!/[a-z]/.test(stringValue)) {
          errorMsg = "Password must contain at least one lowercase letter!";
        } else if (!/[0-9]/.test(stringValue)) {
          errorMsg = "Password must contain at least one number!";
        } else if (!/[@$!%*?&]/.test(stringValue)) {
          errorMsg = "Include at least one special character";
        }
    }

    console.log("errorMsg", errorMsg);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg,
    }));

    return !errorMsg;
  };

  console.log("errorMsg", errors);

  const submitHandler = () => {
    dicpatch(saveBackHandler(true));
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      setLoad(true);
      const payload = {
        email: formFeald?.email,
        password: formFeald?.password,
      };
      LoginApi(payload)
        .unwrap()
        .then((res) => {
          console.log("LogRess", res);

          const logindata = {
            res: res,
            data: formFeald,
            type:
              res?.userType == "DOCTOR" && res?.status == "PENDING"
                ? null
                : res?.userType,
          };

          console.log("logindata", logindata);
          setUser(logindata);
          toast.success(res?.message ? res?.message : "login Successfuly");
          if (res?.userType == "PATIENT") {
            navigate("/patient/home", { state: res?.userType });
          } else if (
            res?.userType == "DOCTOR" &&
            logindata?.res?.status == "APPROVED"
          ) {
            navigate("/doctor/dashboard", { state: res?.userType });
          } else if (
            res?.userType == "DOCTOR" &&
            logindata?.res?.status == "PENDING"
          ) {
            navigate("/waiting");
          } else if (res?.userType == "ADMIN") {
            navigate("/admin/dashboard", { state: res?.userType });
          }
          window.location.reload();
        })
        .catch((err) => {
          console.log("LogErr", err);
          toast.error(err?.data?.message ? err?.data?.message : err?.status);
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };

  console.log("formFeald", formFeald);

  return (
    <>
      {/* <div
        className="com"
        style={{
          height: "20px",
          width: "30px",
          position: "absolute",
        }}
      /> */}

      {droptoggle && (
        <button
          onClick={() => {
            dropdownToggle();
          }}
          className="position-absolute popuplayer"
        />
      )}
      <div className="login-right container">
        <div className="big-cont d-flex ac-jc">
          <p className="text-dark f3 text-center fs-4 ">Sign In</p>
        </div>
        <div className="container gap-4 w-100 d-flex ac-jc flex-column">
          {/* <div className="droplayer d-flex ac-js flex-column">
            <p className="mb-1 text-left w-100 light_gray f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
              User Type
            </p>
            <div className="drop-cont d-flex w-100 ac-js">
              <input
                disabled
                className="input-cont w-100 px-3 f2 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
                placeholder="User Type"
                value={formFeald?.userType}
                onChange={(e) => fealdOnChange("userType", e.target.value)}
              />
              <button
                onClick={() => {
                  dropdownToggle();
                }}
                className="dropdown d-flex ac-jc"
              >
                <img alt={"img"} src={dropdown} className="drop-icon" />
              </button>
              <div
                className={`${
                  droptoggle
                    ? "dropdown-list rounded-4 px-3 pt-1 animated"
                    : "dropdown-list rounded-4 px-3 pt-1 "
                }`}
              >
                {logintype?.map((item) => {
                  return (
                    <button
                      onClick={() => {
                        setDropToggle(false);
                        fealdOnChange("userType", item.name);
                        validateInput("userType", item.name);
                      }}
                      className={`${
                        droptoggle
                          ? "w-100 d-flex ac-js drop-btn border-0 bg-transparent shadow-6 border-bottom text-start animated"
                          : "w-100 d-flex ac-js drop-btn border-0 bg-transparent shadow-6 border-bottom text-start "
                      }`}
                    >
                      <p className="m-0 w-100 f2 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11">
                        {item?.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            {errors?.userType && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100  text-danger f2 fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors?.userType}
                </p>
              </div>
            )}
          </div> */}
          <div className=" droplayer d-flex ac-js flex-column ">
            <p className="mb-1 text-left w-100 light_gray f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
              Email/Phone Number
            </p>
            <div className="drop-cont d-flex w-100 ac-js">
              <input
                className="input-cont w-100 f2 px-3 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
                placeholder="Email/Phone Number"
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
          <div className=" droplayer d-flex ac-js flex-column ">
            <p className="mb-1 text-left w-100 light_gray f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
              Password
            </p>
            <div className="drop-cont d-flex w-100 ac-js">
              <input
                onFocus={() => {
                  setDropToggle(false);
                }}
                type={passwordShow ? "text" : "password"}
                className="input-cont w-100 f2 px-3 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
                placeholder="Password"
                value={formFeald?.password}
                onChange={(e) => fealdOnChange("password", e.target.value)}
              />
              <button
                onClick={() => {
                  setPasswordShow(!passwordShow);
                }}
                className="dropdown2 d-flex ac-jc pe-4"
              >
                <img
                  alt={"img"}
                  src={passwordShow ? view : no_view}
                  className="drop-icon"
                />
              </button>
            </div>
            {errors?.password && (
              <div className="error-cont">
                <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                  {errors?.password}
                </p>
              </div>
            )}
          </div>
          <div className="d-flex ac-je pass-cont">
            <p className="m-0 text-left w-100 text-end ">
              <a
                href=""
                onClick={() => {
                  navigate("/forgotpassword");
                }}
                className="light_gray f2 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14"
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                Forgot Password?
              </a>
            </p>
          </div>
        </div>
        <div className="w-100 d-flex flex-column ac-jc gap-3">
          <button
            onClick={() => {
              submitHandler();
            }}
            className="d-flex ac-jc btn-cont border-0 rounded-4 gap-2"
          >
            <p className="mb-0 white f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
              Sign In
            </p>
            <EastOutlinedIcon className="white f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13" />
          </button>
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
        </div>
      </div>
    </>
  );
};

export default LoginForm;
