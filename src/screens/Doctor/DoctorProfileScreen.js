import { height } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { profilemt } from "../../assets/image";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { doctorprofileinput } from "../../Data/DummyJson";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PageLoad from "../../components/Loading/PageLoad";
import { useNavigate } from "react-router-dom";
import Poppup from "../../components/Common/Poppup/Poppup";
import {
  useDoctor_profile_updateMutation,
  useLazyProfileViewQuery,
  useLogoutMutation,
} from "../../Data/Api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useUser from "../../Data/Local/userDetail";
import { saveBackHandler } from "../../Data/Redux/slice/backHandler";
const DoctorProfileScreen = () => {
  const navigation = useNavigate();
  const dicpatch = useDispatch();
  const fileInputRef = useRef(null);
  const [editToggle, setEditToggle] = useState(false);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState(true);
  const [logout, setlogout] = useState(false);
  const { user, setUser } = useUser();

  const [formFeald, setFormFeald] = useState({
    firstName: "",
    lastName: "",
    licenseNumber: "",
    qualification: "",
    specialization: "",
    email: "",
    phoneNumber: null,
    clinicAddress: null,
    clinicName: "",
    experience: "",
    dateofbirth: "",
    gender: "",
  });

  // Api
  const [logoutApi] = useLogoutMutation();
  const [profileView] = useLazyProfileViewQuery();
  const [profileUpdateApi] = useDoctor_profile_updateMutation();

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Check if ref is not null before clicking
    }
  };

  const fealdOnChange = (field, value) => {
    console.log("field, value", field, value);
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };

  // Form Validation
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
      case "qualification":
        if (!stringValue) {
          errorMsg = "Address is required!";
        }
        break;
      case "specialization":
        if (!stringValue) {
          errorMsg = "Address is required!";
        }
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
      case "clinicAddress":
        if (!stringValue) {
          errorMsg = "Clinic Address is required!";
        }
        break;
      case "clinicName":
        if (!stringValue) {
          errorMsg = "Clinic Name is required!";
        }
        break;
      case "experience":
        if (!stringValue) {
          errorMsg = "Experience is required!";
        }
        break;
      case "dateofbirth":
        if (!stringValue) {
          errorMsg = "Date of birth is required!";
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

  const profileViewFun = () => {
    profileView()
      .unwrap()
      .then((res) => {
        console.log("Ress", res);
        const dateObj = new Date(res?.dateOfBirth);
        const formattedDate = dateObj.toISOString().slice(0, 10);
        setFormFeald({
          firstName: res?.firstName,
          lastName: res?.lastName,
          licenseNumber: res?.licenseNumber,
          qualification: res?.qualification,
          specialization: res?.specialization,
          email: res?.email,
          phoneNumber: res?.phoneNumber,
          clinicAddress: res?.clinicAddress,
          clinicName: res?.clinicName,
          dateofbirth: formattedDate,
          gender: res?.gender,
          experience: res?.experience,
        });
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  const editFun = () => {
    setLoad(true);
    const payload = Object.fromEntries(
      Object.entries({
        email: formFeald?.email,
        phoneNumber: formFeald?.phoneNumber,
        password: user?.data?.password,
        clinicName: formFeald?.clinicName,
        clinicAddress: formFeald?.clinicAddress,
        specialization: formFeald?.specialization,
        experience: formFeald?.experience,
        qualification: formFeald?.qualification,
      }).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    console.log("payload", payload);

    profileUpdateApi(payload)
      .unwrap()
      .then((res) => {
        console.log("UpdateRes", res);
        setEditToggle(false);
        toast.success("Profile updated successfully.");
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err?.data?.message || err?.status || "BAD_REQUEST");
      })
      .finally(() => {
        setLoad(false);
      });
  };

  useEffect(() => {
    profileViewFun();
  }, load);

  const poppupHandle = (item) => {
    if (item == "yes") {
      setLoad(true);
      logoutApi()
        .unwrap()
        .then((res) => {
          setUser(null);
          console.log("Ress", res);
          toast.success("Logout successful!");
          setLoad(false);
          dicpatch(saveBackHandler(true));
          navigation("/login");
          setlogout(false);
          window.location.reload();
        })
        .catch((err) => {
          setUser(null);
          setLoad(false);
          dicpatch(saveBackHandler(true));
          navigation("/login");
          setlogout(false);
          window.location.reload();
          toast.success("Logout successful!");
        })
        .finally(() => {
          setUser(null);
          setLoad(false);
          dicpatch(saveBackHandler(true));
          navigation("/login");
          setlogout(false);
          window.location.reload();
        });
      setlogout(!logout);
    } else {
      setlogout(!logout);
    }
  };

  return (
    <div>
      {load && <PageLoad />}
      {logout && (
        <Poppup
          cont=" Are you sure you want to Logout ?"
          type="logout"
          poppupHandle={poppupHandle}
        />
      )}
      <div className="d-flex ac-jb">
        <p className="mb-0 f3 primary fs-xxl-20 fs-xl-18 fs-lg-17 fs-md-15 fs-sm-15 fs-xs-14 textani ">
          My Profile
        </p>
        {editToggle ? (
          <button
            onClick={() => {
              // setEditToggle(!editToggle);
              editFun();
            }}
            className="d-flex ac-jc gap-2 bg-primarys border-0 px-md-4 py-md-2 px-2 py-1 rounded-2"
          >
            <SaveOutlinedIcon className="white f2" />
            <p className="mb-0 white f2 fs-xxl-15 fs-xl-14 fs-lg-14 fs-md-13 fs-sm-13 fs-xs-12 textani">
              Save Changes
            </p>
          </button>
        ) : (
          <button
            onClick={() => {
              setEditToggle(!editToggle);
              // editFun();
            }}
            className="d-flex ac-jc gap-2 bg-primarys border-0 px-md-4 py-md-2 px-2 py-1 rounded-2"
          >
            <EditOutlinedIcon className="white f2" />
            <p className="mb-0 white f2 fs-xxl-15 fs-xl-14 fs-lg-14 fs-md-13 fs-sm-13 fs-xs-12 textani">
              Edit
            </p>
          </button>
        )}
      </div>
      {/* <div className="com p-5" /> */}
      <div className="profile-top rounded-4 my-4 p-md-5 p-2 w-100 position-relative ">
        {/* <div className="photo-name d-flex flex-column flex-md-row ac-js gap-md-3 gap-sm-4">
          <div className="profile-img d-flex ac-jc">
            <img className="" src={image || profilemt} alt="Profile image" />
            {editToggle && (
              <button
                onClick={handleButtonClick}
                className="profile-hove d-flex ac-jc flex-column border-0"
              >
                <p className="mb-0 text-center white f1 fs-xxl-11 fs-xl-11 fs-lg-11 fs-md-10 fs-sm-10 fs-xs-11 textani">
                  Upload profile Photo
                </p>
                <AddAPhotoOutlinedIcon className="text-center white" />
              </button>
            )}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }} // Hide input field
          onChange={handleImageChange}
        /> */}
        <div className="w-100 d-flex flex-wrap ac-jb gap-md-3 gap-3 gap-xl-2 py-4 textani">
          {doctorprofileinput?.map((item) => {
            return (
              <>
                {item?.type === "select" ? (
                  <div className="w-sm-30 wi-100  pro position-relative">
                    <p className="mb-md-2 mb-1 f1 light_gray fs-xxl-15 fs-xl-14 fs-lg-14 fs-md-13 fs-sm-13 fs-xs-12 textani">
                      {item?.lable}
                    </p>
                    <select
                      // disabled={!editToggle}
                      disabled={true}
                      value={formFeald?.[item?.formFeald] || ""}
                      onChange={(e) => {
                        fealdOnChange(item?.formFeald, e.target.value);
                      }}
                      // onChange={(e) => {
                      //   const selectedOption = item.list.find(
                      //     (opt) => opt.name === e.target.value
                      //   );
                      //   fealdOnChange(item?.formFeald, selectedOption);
                      // }}
                      className={`${
                        editToggle ? "textani shadows  black" : ""
                      } w-100 py-md-2 opacity-50 custom-select py-2 px-md-2 px-2 border-0 bg-light rounded-2 f1  fs-xxl-16 fs-xl-15 fs-lg-15 fs-md-14 fs-sm-14 fs-xs-13 `}
                    >
                      <option className="light_gray" selected value="" disabled>
                        {item?.firstoption}
                      </option>
                      {item?.list?.map((item, index) => {
                        return (
                          <option
                            key={index}
                            className="black"
                            value={item?.name}
                          >
                            {item?.name}
                          </option>
                        );
                      })}
                    </select>
                    {errors?.[item?.formFeald] && (
                      <div className="error-cont">
                        <p className="mb-1 text-left w-100 f2 text-danger fs-xs-10 fs-xl-11 fs-lg-10 fs-sm-10">
                          {errors?.[item?.formFeald]}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-sm-30 wi-100  pro position-relative">
                    <p className="mb-md-2 mb-1 f1 light_gray fs-xxl-15 fs-xl-14 fs-lg-14 fs-md-13 fs-sm-13 fs-xs-12 textani">
                      {item?.lable}
                    </p>
                    <input
                      style={
                        item?.formFeald == "phoneNumber" ||
                        item?.formFeald == "email" ||
                        item?.formFeald == "licenseNumber" ||
                        item?.formFeald == "firstName" ||
                        item?.formFeald == "lastName" ||
                        item?.formFeald == "dateofbirth"
                          ? { opacity: 0.6 }
                          : { opacity: 1 }
                      }
                      type={item?.type}
                      disabled={
                        !editToggle ||
                        item?.formFeald == "phoneNumber" ||
                        item?.formFeald == "email" ||
                        item?.formFeald == "licenseNumber" ||
                        item?.formFeald == "firstName" ||
                        item?.formFeald == "lastName" ||
                        item?.formFeald == "dateofbirth"
                          ? true
                          : false
                      }
                      value={formFeald?.[item?.formFeald]}
                      onChange={(e) => {
                        fealdOnChange(item?.formFeald, e.target.value);
                      }}
                      placeholder={item?.placeholder}
                      className={`${
                        editToggle ? " shadows " : ""
                      } w-100 py-md-2 py-2 px-md-2 px-2 border-0 bg-light rounded-2 f1 black fs-xxl-16 fs-xl-15 fs-lg-15 fs-md-14 fs-sm-14 fs-xs-13 textani`}
                    />
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
        <div className="d-flex ac-jb">
          <button
            onClick={() => {
              navigation("/profile/forgotpassword");
            }}
            className="change bg-dark_primary rounded-2 py-1 px-3 fs-xxl-15 fs-xl-14 fs-lg-14 fs-md-13 fs-sm-13 fs-xs-12 textani white f1 border-0"
          >
            Change Password
          </button>
          <button
            onClick={() => {
              poppupHandle();
            }}
            className="change bg-dan rounded-1 py-1 px-3 white f1 border-0 fs-xxl-15 fs-xl-14 fs-lg-14 fs-md-13 fs-sm-13 fs-xs-12 textani"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileScreen;
