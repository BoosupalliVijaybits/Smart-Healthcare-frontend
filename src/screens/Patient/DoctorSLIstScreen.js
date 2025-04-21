import React, { useEffect, useState } from "react";
import { useLazyAlldoctorsQuery } from "../../Data/Api/api";
import PageLoad from "../../components/Loading/PageLoad";
import EmptyScreen from "../../components/Common/EmptyScreen";
import { emptyappoinmrnt, profilemt } from "../../assets/image";
import { useNavigate } from "react-router-dom";

const PatientDoctorListScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Api
  const [getAllDoctor] = useLazyAlldoctorsQuery();

  const getDoctorsFun = () => {
    setLoading(true);
    getAllDoctor()
      .unwrap()
      .then((res) => {
        console.log("listRess", res);
        const pendingData = res?.filter((item) => item?.status === "APPROVED");
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
    <div className="fancy-doctor-list rounded-5 bg-white">
      <p className="primary mb-4 text-uppercase f3 fs-xxl-19 mb-0 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
        👨‍⚕️ Meet Our Specialists
      </p>
      {loading ? (
        <PageLoad />
      ) : data?.length == 0 ? (
        <EmptyScreen img={emptyappoinmrnt} content="Doctors Not Found" />
      ) : (
        <div className="doctor-grid">
          {data.map((doc) => (
            <div className="doctor-card2" key={doc.id}>
              {/* <div className="img-wrap">
                <img src={doc.image ? doc.image : profilemt} alt={doc.name} />
              </div> */}
              <h3 className="f1 black">
                {doc.firstName + " " + doc?.lastName}
              </h3>
              <p className="spec f2">{doc.specialization}</p>
              <p className="hospital f1">{doc.clinicName}</p>
              <p className="location f4 w-90">📍 {doc.clinicAddress}</p>
              {/* <p className="rating f4">⭐ {doc.rating}</p> */}
              <button
                onClick={() => {
                  navigate("/patient/doctors/detail", { state: { data: doc } });
                }}
                className="book-btn f3"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDoctorListScreen;
