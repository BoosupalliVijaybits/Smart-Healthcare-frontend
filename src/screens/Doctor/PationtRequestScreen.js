import React, { useEffect, useState } from "react";
import { completeAppoinment } from "../../Data/DummyJson";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useLazyToday_appoinmentsQuery,
  useLazyUpcomming_appoinmentsQuery,
} from "../../Data/Api/api";
import PageLoad from "../../components/Loading/PageLoad";
import EmptyScreen from "../../components/Common/EmptyScreen";
import { notfound } from "../../assets/image";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";

const PationtRequestScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [patientslists, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);

  const path = location?.pathname;

  // Api
  const [upcommingAppoinment] = useLazyUpcomming_appoinmentsQuery();

  useEffect(() => {
    setLoading(true);
    upcommingAppoinment()
      .unwrap()
      .then((res) => {
        console.log("Ress", res);
        setPatientList(res || []);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
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

  return (
    <div className="completed-patients-container">
      {loading ? (
        <PageLoad />
      ) : patientslists?.length == 0 ? (
        <EmptyScreen img={notfound} content={"Appointments Not Found"} />
      ) : (
        <>
          <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
            Upcomming Appointments
          </p>
          <div className="patients-list">
            {patientslists.map((patient) => (
              <div
                onClick={() => {
                  navigate("/doctor/today-appointment/detail", {
                    state: patient,
                  });
                }}
                key={patient?.id}
                className="patient-card position-relative cp"
              >
                {patient?.status == "COMPLETED" ? (
                  <button className="rounded-2 px-3 green f2 border-0 bg-transparent mins">
                    <CheckCircleOutlinedIcon />
                  </button>
                ) : (
                  patient?.cancelled && (
                    <button className="rounded-2 px-3 red f2 border-0 bg-transparent mins">
                      <DoDisturbAltOutlinedIcon />
                    </button>
                  )
                )}
                {/* <div className="posia">
              <button className="px-md-3 px-2 white accept f6 border-0 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-12 textani">
                Accept
              </button>
              <button className=" px-md-3 px-2 reject white f6 border-0 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-12 textani ">
                Reject
              </button>
            </div> */}
                <div className="patient-info">
                  <p className="fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14 f3 black textani">
                    {`${patient?.patient?.firstName} ${patient?.patient?.lastName}`}
                  </p>
                  <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                    <strong className=" light_gray f6 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                      Gender:
                    </strong>{" "}
                    {patient?.patient?.gender}
                  </p>
                  <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                    <strong className="light_gray f4 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                      Date:
                    </strong>{" "}
                    {patient?.timeSlot?.date}
                  </p>
                  <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                    <strong className="light_gray f4 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                      Time:
                    </strong>{" "}
                    {/* {`${patient?.timeSlot?.startTime} To ${patient?.timeSlot?.endTime}`} */}
                    {` ${formatTimeToAMPM(
                      patient?.timeSlot?.startTime
                    )} To ${formatTimeToAMPM(patient?.timeSlot?.endTime)}`}
                  </p>
                  <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                    <strong className="light_gray f4 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                      Duration:
                    </strong>{" "}
                    {`${patient?.timeSlot?.duration} minutes`}
                  </p>
                </div>
                {/* <CheckCircle className="completed-icon" size={24} /> */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PationtRequestScreen;
