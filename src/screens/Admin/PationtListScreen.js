import React, { useEffect, useState } from "react";
import { completeAppoinment } from "../../Data/DummyJson";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
import { useLazyAllpatientsQuery } from "../../Data/Api/api";
import PageLoad from "../../components/Loading/PageLoad";
import EmptyScreen from "../../components/Common/EmptyScreen";
import { emptyappoinmrnt } from "../../assets/image";

const PationtListScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Api
  const [getAllPatient] = useLazyAllpatientsQuery();

  const getPatientsFun = () => {
    setLoading(true);
    getAllPatient()
      .unwrap()
      .then((res) => {
        console.log("listRess", res);
        setData(res);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPatientsFun();
  }, []);

  return (
    <div className="completed-patients-container">
      <p className="primary text-start f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
        {/* My Appointments */}
        {/* Patients Booked Appointment */}
        All Patients
      </p>
      {loading ? (
        <PageLoad />
      ) : data?.length == 0 ? (
        <EmptyScreen img={emptyappoinmrnt} content="Patients Not Found" />
      ) : (
        <div className="patients-list d-flex ac-js flex-wrap gap-4">
          {data.map((patient) => (
            <div
              onClick={() => {
                navigate("/admin/patient/detail", {
                  state: patient,
                });
              }}
              key={patient?.id}
              className="patient-card box position-relative cp"
            >
              {/* <button
                onClick={() => {
                  navigate("/admin/patient/detail", {
                    state: patient,
                  });
                }}
                className="rounded-2 px-3 primary f2 border-0 bg-transparent mins"
              >
                <RemoveRedEyeOutlinedIcon />
              </button> */}
              <div className="patient-info">
                <p className="fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14 f3 black textani">
                  {patient.name}
                </p>
                <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                  <strong className=" light_gray f6 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                    Name:
                  </strong>{" "}
                  {patient.firstName + " " + patient?.lastName}
                </p>
                <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                  <strong className=" light_gray f6 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                    Phone No:
                  </strong>{" "}
                  {patient.phoneNumber}
                </p>
                <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                  <strong className=" light_gray  f6 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                    Address:
                  </strong>{" "}
                  {patient.address}
                </p>
              </div>
              {/* <CheckCircle className="completed-icon" size={24} /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PationtListScreen;
