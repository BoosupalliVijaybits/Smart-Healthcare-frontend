import React, { useEffect, useState } from "react";
import { admindoctorsList, completeAppoinment } from "../../Data/DummyJson";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
import {
  useLazyAlldoctorsQuery,
  useLazyDoctorgetbystatusQuery,
} from "../../Data/Api/api";
import PageLoad from "../../components/Loading/PageLoad";
import EmptyScreen from "../../components/Common/EmptyScreen";
import { emptyappoinmrnt } from "../../assets/image";

const DoctorRequestScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Api
  const [getAllDoctor] = useLazyAlldoctorsQuery();
  const [approvedDoctorApi] = useLazyDoctorgetbystatusQuery();

  const getDoctorsFun = () => {
    setLoading(true);
    const status = "PENDING";
    approvedDoctorApi(status)
      .unwrap()
      .then((res) => {
        console.log("Ress", res);
        const pendingData = res?.filter((item) => item?.status === "PENDING");
        setData(pendingData);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDoctorsFun();
  }, []);

  return (
    <>
      {loading ? (
        <PageLoad />
      ) : (
        <div className="completed-patients-container text-start">
          <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
            Doctors Request
          </p>
          {data?.length == 0 ? (
            <EmptyScreen
              img={emptyappoinmrnt}
              content="Doctor Request Not Found"
            />
          ) : (
            <div className="patients-list">
              {data.map((doctor) => (
                <div
                  onClick={() => {
                    navigate("/admin/doctor/request/detail", {
                      state: { doctor, type: "request" },
                    });
                  }}
                  key={doctor?.id}
                  className="patient-card cp position-relative"
                >
                  {/* <button
                    onClick={() => {
                      navigate("/admin/doctor/request/detail", {
                        state: { doctor, type: "request" },
                      });
                    }}
                    className="rounded-2 px-3 primary f2 border-0 bg-transparent mins"
                  >
                    <RemoveRedEyeOutlinedIcon />
                  </button> */}
                  <div className="patient-info">
                    <p className="fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14 f3 black textani">
                      {doctor.name}
                    </p>
                    <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                      <strong className=" light_gray f6 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                        Doctor Id:
                      </strong>{" "}
                      {doctor?.id}
                    </p>
                    <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                      <strong className=" light_gray f6 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                        Name:
                      </strong>{" "}
                      {`${doctor.firstName + " " + doctor.lastName}`}
                    </p>
                    <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                      <strong className=" light_gray f6 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                        Specialization:
                      </strong>{" "}
                      {doctor?.specialization}
                    </p>
                  </div>
                  {/* <CheckCircle className="completed-icon" size={24} /> */}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DoctorRequestScreen;
