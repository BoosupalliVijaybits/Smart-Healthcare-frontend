import React, { useEffect, useState } from "react";
import { completeAppoinment } from "../../Data/DummyJson";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
import { useLazyUpcomming_appoinmentsQuery } from "../../Data/Api/api";
import PageLoad from "../../components/Loading/PageLoad";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import EmptyScreen from "../../components/Common/EmptyScreen";
import { notfound } from "../../assets/image";

const DoctorPAtionScree = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Api
  const [upcommitAppoinmentApi] = useLazyUpcomming_appoinmentsQuery();
  const getCompleteFun = () => {
    setLoading(true);
    upcommitAppoinmentApi()
      .unwrap()
      .then((res) => {
        console.log("Res", res);
        const completedData = res?.filter(
          (item) => item?.status == "COMPLETED"
        );
        setDatas(completedData || []);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCompleteFun();
  }, []);

  console.log("datas", datas);

  return (
    <>
      {loading && <PageLoad />}
      <div className="completed-patients-container">
        {datas?.length > 0 && (
          <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
            {/* My Appointments */}
            Patients Booked Appointment
          </p>
        )}
        <div className="patients-list">
          {datas?.length == 0 ? (
            <EmptyScreen img={notfound} content={"Patient Not Found"} />
          ) : (
            datas?.map((patient) => {
              return (
                <div
                  onClick={() => {
                    navigate("/doctor/patient/detail", {
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
                    patient?.status == "CANCEL" && (
                      <button className="rounded-2 px-3 red f2 border-0 bg-transparent mins">
                        <DoDisturbAltOutlinedIcon />
                      </button>
                    )
                  )}
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
                      <strong className=" light_gray f6 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                        Date:
                      </strong>{" "}
                      {patient?.timeSlot?.date}
                    </p>
                    <p className="primary f1 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                      <strong className=" light_gray f6 fs-xxl-17 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14">
                        Status:
                      </strong>{" "}
                      {patient?.status}
                    </p>
                  </div>
                  {/* <CheckCircle className="completed-icon" size={24} /> */}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorPAtionScree;
