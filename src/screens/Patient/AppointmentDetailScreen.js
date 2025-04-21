import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { appointmentList } from "../../Data/DummyJson";
import Poppup from "../../components/Common/Poppup/Poppup";
import {
  useCancelappoinmentMutation,
  useLazyGetreviweQuery,
  useLazyPatientpriscribeviewQuery,
  useReview_postMutation,
} from "../../Data/Api/api";
import { toast } from "react-toastify";
import PageLoad from "../../components/Loading/PageLoad";
import DoctorFeedbackPopup from "../../components/Pationt/Apponment/DoctorFeedbackPopup";

const AppointmentDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef();
  const stateData = location?.state;
  const patient_data = stateData?.patient;
  const timeSlot = stateData?.timeSlot;
  const doctor_data = timeSlot?.doctor;

  const [CancelPop, setCancelPop] = useState(false);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewPop, setReviewPop] = useState(false);

  console.log("stateData", stateData);
  // Api
  const [priscriptionView] = useLazyPatientpriscribeviewQuery();
  const [cancelAppoinment] = useCancelappoinmentMutation();
  const [getReviewApi] = useLazyGetreviweQuery();
  const [addreviewApi] = useReview_postMutation();

  const appointment = appointmentList?.find(
    (item) => item?.id === parseInt(location?.state?.id)
  );

  const poppupHandle = (status) => {
    console.log("status", status);
    if (status == "yes") {
      setLoading(true);
      const id = stateData?.id;
      cancelAppoinment(id)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          setCancelPop(false);
          toast.success(res?.message || "Appointment canceled successfully.");
          navigate(-1);
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (status == "no") {
      setCancelPop(!CancelPop);
    } else {
      setCancelPop(!CancelPop);
    }
  };

  const getDetail = () => {
    setLoading(true);
    const id = patient_data?.id;
    priscriptionView(id)
      .unwrap()
      .then((res) => {
        const priscData = res?.filter(
          (item) => item?.appointmentResponse?.id == stateData?.id
        );
        console.log("ResssP", res, priscData);
        setDatas(priscData || []);
        getReview();
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getReview = () => {
    getReviewApi(doctor_data?.id)
      .unwrap()
      .then((res) => {
        console.log("RevRess", res);
        // const myrevi=res?.filter(item=>item?.)
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log("datas", datas);

  const convertTo12Hour = (time24) => {
    const [hour, minute] = time24.split(":");
    const date = new Date();
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (stateData?.status == "COMPLETED") {
      setReviewPop(true);
    }
    getDetail();
  }, []);

  const downloadFullPrescription = () => {
    const content = componentRef?.current?.innerHTML;
    const printWindow = window?.open("", "_blank");
    printWindow?.document?.write(`
      <html>
        <head>
          <title>Patient Prescription</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .hospital-header {
              text-align: center;
              margin-bottom: 10px;
            }
            .hospital-header h2 {
              margin: 0;
            }
            .hospital-header p {
              margin: 0;
              font-size: 12px;
            }
            hr {
              border: 1px solid #000;
              margin: 10px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            table, th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
              font-size: 12px;
            }
            th {
              background-color: #f2f2f2;
            }
            .doctor-signature {
              margin-top: 30px;
            }
            .doctor-signature p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const appRating = (data) => {
    if (data?.rating) {
      setLoading(true);
      console.log("datsdatadataa", data);
      const payload = {
        doctorId: doctor_data?.id,
        rating: data?.rating,
        comments: data?.message,
      };
      addreviewApi(payload)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          setReviewPop(false);
          toast.success(res?.message || "Feedback submitted successfully");
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setReviewPop(!reviewPop);
    }
  };

  return (
    <>
      {reviewPop && <DoctorFeedbackPopup onSubmit={appRating} />}
      {loading && <PageLoad />}
      {CancelPop && (
        <Poppup
          cont=" Are you sure you want to Cancel Appoinment ?"
          type="appoinmentcancle"
          poppupHandle={poppupHandle}
        />
      )}
      <div className="detail-container">
        <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
          Appointment Details
        </p>
        <div className="detail-wrapper">
          <div className="detail-card">
            <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
              Doctor Information
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Name:
              </strong>
              {` ${doctor_data?.firstName} ${doctor_data?.lastName}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Contact:
              </strong>
              {` ${doctor_data?.phoneNumber}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Gender:
              </strong>
              {` ${doctor_data?.gender}`}
            </p>
          </div>

          <div className="detail-card">
            <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
              Appointment Information
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Date:
              </strong>
              {` ${timeSlot?.date}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Time:
              </strong>
              {` ${convertTo12Hour(timeSlot?.startTime)} To ${convertTo12Hour(
                timeSlot?.endTime
              )}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black d-flex ac-js gap-1">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Status:
              </strong>
              <span className={`status   ${stateData?.status.toLowerCase()}`}>
                {stateData?.cancelled ? (
                  <p class="cancelled f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  mb-0 fs-xs-13 textani">
                    ❌ Cancelled
                  </p>
                ) : stateData?.status == "IN_PROGRESS" ? (
                  <p class="pending f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  mb-0 mt-0 fs-xs-13 textani">
                    ⏳ Pending
                  </p>
                ) : (
                  stateData?.status == "COMPLETED" && (
                    <p class="green f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  m-0 fs-xs-13 textani">
                      ✔ Completed
                    </p>
                  )
                )}
              </span>
            </p>
          </div>
          <div className="detail-card">
            <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
              Hospital Information
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Clinic Name :
              </strong>
              {` ${doctor_data?.clinicName}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Clinic Address :
              </strong>
              {` ${doctor_data?.clinicAddress}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Specialization:
              </strong>
              {` ${doctor_data?.specialization}`}
            </p>
          </div>
        </div>
        {datas?.length > 0 && (
          <div className="full-prescription my-3">
            <button
              className="btn download-all bg-primarys white f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
              onClick={downloadFullPrescription}
            >
              📥 Download Prescription
            </button>
          </div>
        )}
        {datas?.length > 0 && (
          <div className="medication-container rounded-3">
            <div className="w-100 d-flex  ac-jb mb-3 medication-table">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th
                      style={{
                        color: "#fff",
                      }}
                      className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani"
                    >
                      S.NO
                    </th>
                    <th
                      style={{
                        color: "#fff",
                      }}
                      className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani"
                    >
                      Medicine Name
                    </th>
                    <th
                      style={{
                        color: "#fff",
                      }}
                      className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani"
                    >
                      Dosage
                    </th>
                    <th
                      style={{
                        color: "#fff",
                      }}
                      className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani"
                    >
                      Time to Take
                    </th>
                    <th
                      style={{
                        color: "#fff",
                      }}
                      className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani"
                    >
                      Medicine Time
                    </th>
                    <th
                      style={{
                        color: "#fff",
                      }}
                      className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani"
                    >
                      Start Date
                    </th>
                    <th
                      style={{
                        color: "#fff",
                      }}
                      className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani"
                    >
                      End Date
                    </th>
                    <th
                      style={{
                        color: "#fff",
                      }}
                      className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani"
                    >
                      Status
                    </th>
                    {/* <th>After Food</th> */}
                  </tr>
                </thead>
                <tbody>
                  {datas?.map((prescription, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{prescription?.medicationName}</td>
                      <td>{prescription?.dosage}</td>
                      <td>
                        {prescription?.timeToTake
                          ?.replace(/_/g, " ")
                          ?.toLowerCase()
                          ?.replace(/\b\w/g, (c) => c.toUpperCase())}
                      </td>
                      <td>
                        {prescription?.medicationTime
                          ?.map((item) =>
                            item
                              .toLowerCase()
                              .replace(/\b\w/g, (c) => c.toUpperCase())
                          )
                          .join(", ")}
                      </td>
                      <td>{prescription?.startDate}</td>
                      <td>{prescription?.endDate}</td>
                      <td>{prescription?.status}</td>
                      {/* <td>{prescription?.afterFood}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="action-buttons">
          {stateData?.status == "IN_PROGRESS" && !stateData?.cancelled && (
            <button
              onClick={() => {
                poppupHandle();
              }}
              className="btns  cancel px-md-4 px-3 py-1 py-md-1 f3 white fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13"
            >
              Cancel
            </button>
          )}

          <button
            className="btns bg-transparent back px-md-4 px-3 py-1 py-md-1 f3 white fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
        <div ref={componentRef} style={{ display: "none" }}>
          <div className="hospital-header">
            <h2>{doctor_data?.clinicName}</h2>
            <p>{doctor_data?.clinicAddress}1</p>
            <p>Phone: +91 {doctor_data?.phoneNumber}</p>
          </div>
          <hr />
          <h3 style={{ textAlign: "center" }}>🩺 Patient Prescription</h3>
          <table>
            <thead>
              <tr>
                <th className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                  S.NO
                </th>
                <th className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                  Medicine Name
                </th>
                <th className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                  Dosage
                </th>
                <th className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                  Time to Take
                </th>
                <th className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                  Medicine Time
                </th>
                <th className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                  Start Date
                </th>
                <th className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                  End Date
                </th>
                {/* <th>After Food</th> */}
              </tr>
            </thead>
            <tbody>
              {datas?.map((prescription, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{prescription?.medicationName}</td>
                  <td>{prescription?.dosage}</td>
                  <td>
                    {prescription?.timeToTake
                      ?.replace(/_/g, " ")
                      ?.toLowerCase()
                      ?.replace(/\b\w/g, (c) => c.toUpperCase())}
                  </td>
                  <td>
                    {prescription?.medicationTime
                      ?.map((item) =>
                        item
                          .toLowerCase()
                          .replace(/\b\w/g, (c) => c.toUpperCase())
                      )
                      .join(", ")}
                  </td>
                  <td>{prescription?.startDate}</td>
                  <td>{prescription?.endDate}</td>
                  {/* <td>{prescription?.afterFood}</td> */}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="doctor-signature">
            <p>
              <strong>Doctor's Name:</strong>
              {` ${doctor_data?.firstName} ${doctor_data?.lastName} `}
            </p>
            {/* <p>
                    <strong>Signature:</strong> _______________________
                  </p>
                  <p>
                    <strong>Stamp:</strong> ✅ [HOSPITAL SEAL]
                  </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetail;
