import React, { useEffect, useState } from "react";
import { admincards } from "../../Data/DummyJson";
import { useNavigate } from "react-router-dom";
import {
  useLazyAlldoctorsQuery,
  useLazyAllpatientsQuery,
  useLazyGettimeslotsViewQuery,
} from "../../Data/Api/api";
import PageLoad from "../../components/Loading/PageLoad";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    doctorReq: 0,
    doctors: 0,
    pationts: 0,
  });

  // API Calls
  const [getAllDoctor] = useLazyAlldoctorsQuery();
  const [getAllPatient] = useLazyAllpatientsQuery();

  const getDoctorsFun = () => {
    setLoading(true);
    getAllDoctor()
      .unwrap()
      .then((res) => {
        console.log("listRess", res);
        const pendingDoctors = res?.filter(
          (item) => item?.status === "PENDING"
        ).length;
        const approvedDoctors = res?.filter(
          (item) => item?.status === "APPROVED"
        ).length;

        getAllPatient()
          .unwrap()
          .then((patientRes) => {
            console.log("patientRess", patientRes);
            setCounts({
              doctorReq: pendingDoctors,
              doctors: approvedDoctors,
              pationts: patientRes.length,
            });
          })
          .catch((err) => {
            console.log("Err", err);
          });
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
    <div className="cardBox">
      {loading ? (
        <PageLoad />
      ) : (
        <>
          {admincards.map((item, index) => {
            let updatedNumber = item.number; // Default number from DummyJson

            // Update number dynamically
            if (item.id === 2) updatedNumber = counts?.doctorReq; // Doctor Requests
            if (item.id === 1) updatedNumber = counts?.doctors; // Approved Doctors
            if (item.id === 3) updatedNumber = counts?.pationts; // Patients

            return (
              <div
                key={index}
                onClick={() => navigate(item.navi)}
                className="card"
              >
                <div>
                  <div className="numbers f3 fs-xxl-40 fs-xl-40 fs-lg-30 black fs-sm-29 fs-xs-25">
                    {updatedNumber}
                  </div>
                  <div className="cardName f5 fs-xxl-25 fs-xl-20 fs-lg-17 black fs-sm-15 fs-xs-15">
                    {item.text}
                  </div>
                </div>
                <div className="iconbox">
                  <item.icon className="icon" />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
