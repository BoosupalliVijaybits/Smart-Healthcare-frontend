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
  const [searchTerm, setSearchTerm] = useState("");

  const [getAllDoctor] = useLazyAlldoctorsQuery();

  const getDoctorsFun = () => {
    setLoading(true);
    getAllDoctor()
      .unwrap()
      .then((res) => {
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

  // Filter doctors by specialization
  const filteredDoctors = data.filter((doc) =>
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fancy-doctor-list rounded-5 bg-white">
      <p className="primary mb-4 text-uppercase f3 fs-xxl-19 mb-0">
        👨‍⚕️ Meet Our Specialists
      </p>

      {/* 🔍 Search Bar */}
      {!loading && filteredDoctors.length > 0 && (
        <div className="search-bar mb-4 w-100 ac-js">
          <input
            type="text"
            placeholder="Search by specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      )}

      {loading ? (
        <PageLoad />
      ) : filteredDoctors.length === 0 ? (
        <EmptyScreen img={emptyappoinmrnt} content="Doctors Not Found" />
      ) : (
        <div className="doctor-grid">
          {filteredDoctors.map((doc) => (
            <div className="doctor-card2" key={doc.id}>
              <h3 className="f1 black">
                {doc.firstName + " " + doc?.lastName}
              </h3>
              <p className="spec f2">{doc.specialization}</p>
              <p className="hospital f1">{doc.clinicName}</p>
              <p className="location f4 w-90">📍 {doc.clinicAddress}</p>
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