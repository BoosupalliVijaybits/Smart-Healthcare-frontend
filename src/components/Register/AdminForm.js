import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  adminRegister,
  genderList,
  MaritalStatusList,
  pationtRegister,
} from "../../Data/DummyJson";
import { dropdown, no_view, view } from "../../assets/image";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { toast } from "react-toastify";

const AdminForm = ({ setLoad }) => {
  const navigate = useNavigate();
  const [droptoggle, setDropToggle] = useState({
    bloodgroup: false,
    Marritalstatus: false,
  });
  const [passwordShow, setPasswordShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const [toggle, setToggle] = useState(0);
  const [selectedGender, setSelectedGender] = useState("");

  const [formFeald, setFormFeald] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    dateofbirth: "",
    Marritalstatus: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const fealdOnChange = (field, value) => {
    console.log("field, value", field, value);
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };

  const dropdownToggle = (field) => {
    setDropToggle((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateInput = (field, value) => {
    let errorMsg = "";
    const stringValue = String(value).trim();

    switch (field) {
      case "firstName":
      case "lastName":
        if (!stringValue)
          errorMsg = `${
            field === "firstName" ? "First" : "Last"
          } Name is required!`;
        break;
      case "email":
        if (!stringValue) {
          errorMsg = "Email is required!";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
          errorMsg = "Enter a valid Email!";
        }
        break;
      case "phoneNumber":
        if (!stringValue) {
          errorMsg = "Phone number is required!";
        } else if (!/^[6-9]\d{9}$/.test(stringValue)) {
          errorMsg = "Enter a valid 10-digit phone number!";
        }
        break;
      case "password":
        if (!stringValue) {
          errorMsg = "Password is required!";
        } else if (stringValue.length < 6) {
          errorMsg = "Password must be at least 6 characters long!";
        } else if (!/[A-Z]/.test(stringValue)) {
          errorMsg = "Must contain at least one uppercase letter!";
        } else if (!/[a-z]/.test(stringValue)) {
          errorMsg = "Must contain at least one lowercase letter!";
        } else if (!/[0-9]/.test(stringValue)) {
          errorMsg = "Must contain at least one number!";
        } else if (!/[@$!%*?&]/.test(stringValue)) {
          errorMsg = "Include at least one special character";
        }
        break;
      case "confirmPassword":
        if (!stringValue) {
          errorMsg = "Confirm Password is required!";
        } else if (stringValue !== formFeald?.password) {
          errorMsg = "Passwords do not match!";
        }
        break;
      case "address":
        if (!stringValue) {
          errorMsg = "Address is required!";
        }
        break;
      case "dateofbirth":
        if (!stringValue) {
          errorMsg = "Date of birth is required!";
        }
        break;
      case "Marritalstatus":
        if (!stringValue) {
          errorMsg = "Marrital status is required!";
        }
        break;
      case "gender":
        if (!stringValue) {
          errorMsg = "Gender is required!";
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

  console.log("errorMsg", errors);

  const submitHandler = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      setLoad(true);
      setTimeout(() => {
        toast.success("Registered Successfully");
        setTimeout(() => {
          navigate("/waiting");
          setLoad(false);
        }, 500);
      }, 2000);
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  console.log("passwordShow", passwordShow);

  console.log("formFeald", formFeald);
  return (
    <>
      <div className="container input-row gap-3">
        {adminRegister?.map((item) => {
          return (
            <>
              {item?.type === "select" ? (
                <div className=" droplayer2 d-flex ac-js flex-column w-100 ">
                  <p className="mb-1 text-left w-100 light_gray f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                    {item?.lable}
                  </p>
                  <div className="drop-cont2 d-flex w-100 ac-jb">
                    {genderList?.map((item) => {
                      return (
                        <button
                          onClick={() => {
                            handleGenderSelect(item?.name);
                            fealdOnChange("gender", item.name);
                            validateInput("gender", item.name);
                          }}
                          className="w-100 d-flex gap-1 border-0 bg-transparent"
                        >
                          <div
                            className={`${
                              selectedGender === item?.name
                                ? "smale-cercle rounded-5 d-flex ac-jc"
                                : "smale-cercle2 rounded-5 d-flex ac-jc"
                            }`}
                          >
                            {selectedGender === item?.name && (
                              <div className="inner-cercle rounded-5" />
                            )}
                          </div>
                          <div className="mb-0">
                            <p
                              className={`${
                                selectedGender === item?.name
                                  ? "m-0 primary f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                                  : "m-0 light_primary f1 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                              }`}
                            >
                              {item?.name}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors?.[item?.formFeald] && (
                    <div className="error-cont">
                      <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                        {errors?.[item?.formFeald]}
                      </p>
                    </div>
                  )}
                </div>
              ) : item?.type === "dropdown" ? (
                <div className=" droplayer2 d-flex ac-js flex-column w-100 ">
                  <p className="mb-1 text-left w-100 light_gray f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                    {item?.lable}
                  </p>
                  <div className="drop-cont d-flex w-100 ac-js">
                    <input
                      type="text"
                      disabled
                      className="input-cont w-100  px-3 f2 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
                      placeholder={item?.placeholder}
                      value={formFeald?.[item?.formFeald]}
                      onChange={(e) =>
                        fealdOnChange(item?.formFeald, e.target.value)
                      }
                    />
                    <button
                      onClick={() => {
                        dropdownToggle(item?.formFeald);
                      }}
                      className="dropdown d-flex ac-jc"
                    >
                      <img alt={"img"} src={dropdown} className="drop-icon" />
                    </button>
                    <div
                      className={`${
                        (item?.formFeald === "bloodgroup" &&
                          droptoggle?.bloodgroup) ||
                        (item?.formFeald === "Marritalstatus" &&
                          droptoggle?.Marritalstatus)
                          ? "dropdown-list rounded-4 px-3 pt-1 animated"
                          : "dropdown-list rounded-4 px-3 pt-1 "
                      }`}
                    >
                      {item?.list?.map((list) => {
                        return (
                          <button
                            onClick={() => {
                              setDropToggle(false);
                              fealdOnChange(item?.formFeald, list?.name);
                              validateInput(item?.formFeald, list?.name);
                            }}
                            className={`${
                              droptoggle?.bloodgroup ||
                              droptoggle?.Marritalstatus
                                ? "w-100 d-flex ac-js drop-btn border-0 bg-transparent shadow-6 border-bottom text-start animated"
                                : "w-100 d-flex ac-js drop-btn border-0 bg-transparent shadow-6 border-bottom text-start "
                            }`}
                          >
                            <p className="m-0 w-100 f2 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11">
                              {list?.name}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {errors?.[item?.formFeald] && (
                    <div className="error-cont">
                      <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                        {errors?.[item?.formFeald]}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className=" droplayer2 d-flex ac-js flex-column w-100 ">
                  <p className="mb-1 text-left w-100 light_gray f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
                    {item?.lable}
                  </p>
                  <div className="drop-cont d-flex w-100 ac-js">
                    <input
                      type={
                        (item?.formFeald === "password" &&
                          passwordShow &&
                          passwordShow.password) ||
                        (item?.formFeald === "confirmPassword" &&
                          passwordShow.confirmPassword &&
                          passwordShow)
                          ? "text"
                          : item?.type
                      }
                      className="input-cont w-100 px-3 f2 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11"
                      placeholder={item?.placeholder}
                      value={formFeald?.[item?.formFeald]}
                      onChange={(e) =>
                        fealdOnChange(item?.formFeald, e.target.value)
                      }
                    />
                    {(item?.formFeald === "password" ||
                      item?.formFeald === "confirmPassword") && (
                      <button
                        onClick={() => {
                          togglePasswordVisibility(item?.formFeald);
                        }}
                        className="dropdown2 d-flex ac-jc pe-4"
                      >
                        <img
                          alt={"img"}
                          src={
                            (item?.formFeald === "password" &&
                              passwordShow.password) ||
                            (item?.formFeald === "confirmPassword" &&
                              passwordShow.confirmPassword)
                              ? view
                              : no_view
                          }
                          className="drop-icon"
                        />
                      </button>
                    )}
                  </div>
                  {errors?.[item?.formFeald] && (
                    <div className="error-cont">
                      <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                        {errors?.[item?.formFeald]}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="w-100 d-flex flex-column ac-jc gap-3">
        <button
          onClick={() => {
            submitHandler();
          }}
          className="d-flex ac-jc btn-cont border-0 rounded-4 gap-2"
        >
          <p className="mb-0 white f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
            Register
          </p>
        </button>
        <a
          href=""
          onClick={() => {
            navigate("/login");
          }}
          style={{ cursor: "pointer", textDecoration: "none" }}
          className="primary f1 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 mb-4"
        >
          Already have an account?
        </a>
      </div>
    </>
  );
};

export default AdminForm;
