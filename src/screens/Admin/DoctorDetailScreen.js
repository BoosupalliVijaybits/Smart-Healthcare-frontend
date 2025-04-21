import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { profilemt } from "../../assets/image";
import PageLoad from "../../components/Loading/PageLoad";
import {
  useAcceptdoctorMutation,
  useDoctorDeleteMutation,
  useLazyDoctorViewQuery,
  useLazyGetreviweQuery,
  useRejectdoctorMutation,
} from "../../Data/Api/api";
import AcceptPoppup from "../../components/Common/Poppup/AcceptPoppup";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import ReviewList from "../../components/Pationt/Apponment/ReviewList";
import useUser from "../../Data/Local/userDetail";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";

const DoctorDetailScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [accepttype, setAcceptType] = useState("");
  const [poppupShow, setPoppupShow] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  // const[]

  const path = location?.pathname;
  const stateData = location?.state;
  const types = stateData?.type;
  const loginType = user?.type;

  // Api
  const [doctorViewApi] = useLazyDoctorViewQuery();
  const [acceptDoctorApi] = useAcceptdoctorMutation();
  const [rejectDoctorApi] = useRejectdoctorMutation();
  const [doctorDelete] = useDoctorDeleteMutation();
  const [getReviewApi] = useLazyGetreviweQuery();

  const getDoctorDetaile = () => {
    setLoading(true);
    const id = stateData?.doctor?.id;
    doctorViewApi(id)
      .unwrap()
      .then((res) => {
        console.log("Ress", res);
        setData(res);
        getReviewlist();
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getReviewlist = () => {
    setLoading(true);
    const id = stateData?.doctor?.id;
    getReviewApi(id)
      .unwrap()
      .then((res) => {
        console.log("revres", res);
        setReviewList(res);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const poppupHandle = (type) => {
    console.log("poppupHandle", type);
    const id = stateData?.doctor?.id;
    if (accepttype == "Accept") {
      if (type == "no") {
        setPoppupShow(false);
      } else {
        setLoading(true);
        acceptDoctorApi(id)
          .unwrap()
          .then((res) => {
            console.log("Ress", res);
            toast.success(
              res?.message ? res?.message : "Doctor approved successfully"
            );
            navigate(-1);
          })
          .catch((err) => {
            console.log("Err", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else if (accepttype == "Reject") {
      if (type == "no") {
        setPoppupShow(false);
      } else {
        setLoading(true);
        rejectDoctorApi(id)
          .unwrap()
          .then((res) => {
            console.log("Ress", res);
            toast.success(res?.message ? res?.message : "Doctor rejected");
            navigate(-1);
          })
          .catch((err) => {
            console.log("Err", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const deleteFun = (type) => {
    if (type == "yes") {
      setLoading(true);
      const id = stateData?.doctor?.id;
      doctorDelete(id)
        .unwrap()
        .then((res) => {
          console.log("Ress", res);
          toast.success(
            res?.message ? res?.message : "Doctor deleted successfully"
          );
          navigate(-1);
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoading(false);
          setPoppupShow(false);
        });
    } else {
      setPoppupShow(false);
    }
  };

  useEffect(() => {
    getDoctorDetaile();
  }, []);

  return (
    <>
      {poppupShow &&
        (path == "/admin/doctor/detail" ? (
          <AcceptPoppup
            cont={`Do you want to Delete the Doctor`}
            type={"doctorreq"}
            accepttype={"Delete"}
            poppupHandle={deleteFun}
          />
        ) : (
          <AcceptPoppup
            cont={`Do you want to ${accepttype} the Doctor`}
            type={"doctorreq"}
            accepttype={accepttype}
            poppupHandle={poppupHandle}
          />
        ))}
      {loading ? (
        <PageLoad />
      ) : (
        <div className="completed-patients-container text-start d-flex w-100 as-jb gap-4">
          <div className={`${types == "request" ? "w-100" : "w-60"}`}>
            <div className="d-flex ac-jb mb-3">
              <div className="d-flex ac-jb w-100">
                <p className="primary mb-0 f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
                  Doctors Detail
                </p>
              </div>
              {types == "request" ? (
                <div className="pationts d-flex">
                  <button
                    onClick={() => {
                      setAcceptType("Accept");
                      setPoppupShow(!poppupShow);
                    }}
                    className="px-md-3 px-2 white accept f6 border-0 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-15 fs-xs-14 textani"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      setAcceptType("Reject");
                      setPoppupShow(!poppupShow);
                    }}
                    className=" px-md-3 px-2 reject white f6 border-0 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-15 fs-xs-14 textani "
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div className="w-100 d-flex ac-je">
                  {/* <button
                    onClick={() => {
                      navigate("/admin/doctor/time-slots", {
                        state: data,
                      });
                    }}
                    className="border-0 bg-primarys white px-md-3 px-2 py-md-2 py-1 f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani rounded-3"
                  >
                    View Time Slots
                  </button> */}
                </div>
              )}
            </div>
            <div class="doctor-detail-container position-relative">
              {path == "/admin/doctor/detail" && (
                <button
                  onClick={() => {
                    setPoppupShow(true);
                  }}
                  className="delete_cont border-0 bg-transparent"
                >
                  <DeleteForeverIcon className="red fs-2" />
                </button>
              )}
              <div class="doctor-card">
                {/* <div class="doctor-img">
                  <img src={profilemt} alt="Doctor Image" />
                </div> */}
                <div class="doctor-info">
                  <h2 className="fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-18 fs-xs-15 f3 black textani">
                    {`${data?.firstName} ${data?.lastName}`}
                  </h2>
                  <p class="specialization fs-xxl-19 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f6">
                    Cardiologist
                  </p>
                  <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                      License Number:
                    </strong>{" "}
                    {data?.licenseNumber}
                  </p>
                  <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                      Specialization:
                    </strong>{" "}
                    {data?.specialization}
                  </p>
                  <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                      Experience:
                    </strong>{" "}
                    {data?.experience}
                  </p>
                  <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                      Qualifications:
                    </strong>{" "}
                    {data?.qualification}
                  </p>
                  <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                      Clinic:
                    </strong>{" "}
                    {data?.clinicName}
                  </p>

                  <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    <strong>Phone:</strong> +91 {data?.phoneNumber}
                  </p>
                  <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                      Email:
                    </strong>{" "}
                    {data?.email}
                  </p>
                  <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                      Clinic Address:
                    </strong>{" "}
                    {data?.clinicAddress}
                  </p>
                  {/* <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                  <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    Emergency Contact:
                  </strong>{" "}
                  +91 91234 56789
                </p> */}
                  {/* <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                  <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    Marital Status:
                  </strong>{" "}
                  Married
                </p> */}
                  <p className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                    <strong className="fs-xxl-17 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 f1">
                      Gender:
                    </strong>{" "}
                    {data?.gender}
                  </p>
                </div>
                {types !== "request" && (
                  <button
                    onClick={() => {
                      navigate("/admin/doctor/time-slots", {
                        state: data,
                      });
                    }}
                    className="border-0 views-btn bg-white primary px-md-3 px-2 py-md-2 py-1 f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                  >
                    <LaunchOutlinedIcon /> View Time Slots
                  </button>
                )}
              </div>
            </div>
          </div>
          {types !== "request" && (
            <div className="w-40">
              <div className="post-reviewbtn d-flex ac-jb mb-3">
                <p className="mb-0 slot-date fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f3">
                  All Review
                </p>{" "}
                {loginType == "PATIENT" && (
                  <button className="mb-0 slot-date fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f4 rounded-5">
                    <RateReviewOutlinedIcon /> Write review
                  </button>
                )}
              </div>
              <ReviewList reviewList={reviewList} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DoctorDetailScreen;
