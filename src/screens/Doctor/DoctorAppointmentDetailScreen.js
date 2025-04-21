import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { appointmentList } from "../../Data/DummyJson";
import AddPrescription from "../../components/Doctor/Prescription/AddPrescription";
import ResheduleForm from "../../components/Doctor/Prescription/ResheduleForm";
import {
  useCancelappoinmentMutation,
  useLazyPatientpriscribeviewQuery,
  useLazyPatientViewQuery,
  usePriscribe_addMutation,
} from "../../Data/Api/api";
import { toast } from "react-toastify";
import PageLoad from "../../components/Loading/PageLoad";
import AcceptPoppup from "../../components/Common/Poppup/AcceptPoppup";

const DoctorAppointmentDetailScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formShow, setFormShow] = useState(false);
  // const [resheduleShow, setresheduleShow] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canclePopp, setCanlePopp] = useState(false);

  const stateData = location?.state;
  const patient = stateData?.patient;
  const doctor = stateData?.timeSlot?.doctor;
  const patient_id = stateData?.patient?.id;
  const appointmentStatus = stateData?.status;
  const appoinment_id = stateData?.id;

  console.log("locatappointmentStatusion", location, stateData);

  // Api
  const [patientView] = useLazyPatientViewQuery();
  const [priscribeAddApi] = usePriscribe_addMutation();
  const [priscriptionViewApi] = useLazyPatientpriscribeviewQuery();
  const [cancelAppoinment] = useCancelappoinmentMutation();

  const formToggle = () => {
    setFormShow(!formShow);
  };

  console.log("appointmentsssappointment?.", stateData);

  const addPrescription = (newPrescription) => {
    console.log("newPrescription", newPrescription);
    setLoading(true);
    const payload = {
      appointmentId: stateData?.id,
      patientId: patient_id,
      prescriptions: [
        {
          medicationName: newPrescription?.medicationName,
          dosage: newPrescription?.dosage,
          timeToTake: newPrescription?.timeToTake,
          startDate: newPrescription?.startDate,
          endDate: newPrescription?.endDate,
          medicationTime: newPrescription?.medicationTime,
        },
      ],
    };
    console.log("newPrescriptionpayload", payload);
    priscribeAddApi(payload)
      .unwrap()
      .then((res) => {
        console.log("priscribeRess", res);
        setFormShow(false);
        toast.success("Prescription added successfully");
        priscriptionViewFun();
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err?.data?.message || "BAD_REQUEST");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const priscriptionViewFun = () => {
    setLoading(true);
    console.log("patient_id", patient_id);

    priscriptionViewApi(patient_id)
      .unwrap()
      .then((res) => {
        console.log("priscribeviewRess", res, stateData);
        const myprisc = res?.filter(
          (item) => item?.appointmentResponse?.id == stateData?.id
        );
        console.log("myprisc", myprisc);

        setPrescriptions(myprisc || []);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getPatioentFun = () => {
    patientView(patient_id)
      .unwrap()
      .then((res) => {
        console.log("paRess", res);
        setPrescriptions(res);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err?.data?.message || "BAD_REQUEST");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    console.log("newPrescriptionpayload", location);
    getPatioentFun();
    priscriptionViewFun();
  }, []);

  const formatTimeToAMPM = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(+hours, +minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const cancelFun = (item) => {
    console.log("popitems", item);
    if (item == "yes") {
      setLoading(true);
      cancelAppoinment(appoinment_id)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          toast.success(res?.message || "Appointment canceled successfully");
          navigate(-1);
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoading(false);
          setCanlePopp(false);
        });
    } else if (item == "yes") {
      setCanlePopp(false);
    } else {
      setCanlePopp(!canclePopp);
    }
  };

  console.log("prescriptions", prescriptions);

  return (
    <>
      {loading && <PageLoad />}
      {canclePopp && (
        <AcceptPoppup
          cont={`Do you want to Cancel the Appoinment`}
          type={"doctorreq"}
          accepttype={"Yes"}
          poppupHandle={cancelFun}
        />
      )}
      {formShow && (
        <AddPrescription
          loading={loading}
          formToggle={formToggle}
          addPrescription={addPrescription}
        />
      )}
      {/* {resheduleShow && <ResheduleForm formToggle={sheduleoggle} />} */}
      <div className="detail-container">
        <div className="w-100 d-flex ac-jb">
          <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
            Appointment Details
          </p>
          {!stateData?.cancelled && (
            <button
              onClick={() => {
                formToggle();
              }}
              style={{
                color: "#fff",
              }}
              className="btn download-all bg-primarys white f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani primary"
            >
              Add Prescription
            </button>
          )}
        </div>
        <div className="detail-wrapper">
          <div className="detail-card">
            <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
              Patient Information
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Name:
              </strong>
              {` ${patient?.firstName} ${patient?.lastName}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Contact:
              </strong>
              {` ${patient?.phoneNumber}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Gender:
              </strong>
              {` ${patient?.gender}`}
            </p>
          </div>

          {/* <div className="detail-card">
            <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
              Doctor Information
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Name:
              </strong>
              {` ${doctor?.firstName} ${doctor?.lastName}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Specialization:
              </strong>
              {` ${doctor?.specialization}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Clinic Name :
              </strong>
              {` ${doctor?.clinicName}`}
            </p>
          </div> */}

          <div className="detail-card">
            <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
              Appointment Information
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Date:
              </strong>
              {` ${stateData?.timeSlot?.date}`}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Time:
              </strong>
              {` ${formatTimeToAMPM(
                stateData?.timeSlot?.startTime
              )} To ${formatTimeToAMPM(stateData?.timeSlot?.endTime)}`}
            </p>

            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Duration:
              </strong>
              {` ${stateData?.timeSlot?.duration} minutes`}
            </p>
            {appointmentStatus && (
              <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black d-flex ac-js gap-1">
                <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                  Status:
                </strong>
                <span className={`status ${appointmentStatus.toLowerCase()}`}>
                  {stateData?.cancelled ? (
                    <p class="cancelled f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  mb-0 fs-xs-13 textani">
                      ❌ Cancelled
                    </p>
                  ) : appointmentStatus == "COMPLETED" ||
                    prescriptions?.length > 0 ? (
                    <p class="green f3 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  m-0 fs-xs-13 textani">
                      ✔ Completed
                    </p>
                  ) : appointmentStatus == "IN_PROGRESS" ? (
                    <p class="pending f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  mb-0 fs-xs-13 textani">
                      ⏳ In Progress
                    </p>
                  ) : null}
                </span>
              </p>
            )}
          </div>
        </div>
        {prescriptions?.length > 0 && (
          <p className="primary f2 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-14 textani mt-3">
            Prescription
          </p>
        )}
        {prescriptions?.length > 0 && (
          <div className="medication-container rounded-3">
            <div className="w-100 d-flex  ac-jb mb-3 medication-table">
              <table className="table table-bordered mb-0 ">
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
                    {/* <th>After Food</th> */}
                  </tr>
                </thead>
                <tbody>
                  {prescriptions?.map((prescription, index) => (
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
            </div>
          </div>
        )}
        <div className="action-buttons">
          {/* {((appointmentStatus == "Pending" && prescriptions?.length == 0) ||
            (appointmentStatus == null && prescriptions?.length == 0)) && (
            <button
              onClick={() => {
                sheduleoggle();
              }}
              className="btns reschedule px-md-4 px-3 py-1 py-md-1 f3 white fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13"
            >
              Reschedule
            </button>
          )} */}

          {appointmentStatus == "IN_PROGRESS" &&
            !stateData?.cancelled &&
            prescriptions?.length == 0 && (
              <button
                onClick={() => {
                  cancelFun();
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
      </div>
    </>
  );
};

export default DoctorAppointmentDetailScreen;
