import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { appointmentList, prescriptionsview } from "../../Data/DummyJson";
import AddPrescription from "../../components/Doctor/Prescription/AddPrescription";
import ResheduleForm from "../../components/Doctor/Prescription/ResheduleForm";

const PationtDetaileViewScreen = () => {
  const location = useLocation();
  const [formShow, setFormShow] = useState(false);
  const [resheduleShow, setresheduleShow] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

  const stateData = location?.state;

  const formToggle = () => {
    setFormShow(!formShow);
  };
  const sheduleoggle = () => {
    setresheduleShow(!resheduleShow);
  };

  const appointment = appointmentList?.find(
    (item) => item?.id === parseInt(stateData?.id)
  );

  console.log("appointmentsssappointment?. ", stateData?.status);

  const addPrescription = (newPrescription) => {
    setPrescriptions([...prescriptions, newPrescription]);
  };

  return (
    <>
      <div className="detail-container">
        <div className="w-100 d-flex ac-jb">
          <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
            Appointment Details
          </p>
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
              vijay
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Age:
              </strong>
              23
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Gender:
              </strong>
              Female
            </p>
          </div>

          <div className="detail-card">
            <p className="primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
              Doctor Information
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Name:
              </strong>
              {appointment?.doctorName}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Specialization:
              </strong>
              {appointment?.specialization}
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
              {appointment?.appointmentDate}
            </p>
            <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
              <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                Time:
              </strong>
              {appointment?.appointmentTime}
            </p>
            {stateData?.status == "Pending" && (
              <p className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black d-flex ac-js gap-1">
                <strong className="f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                  Status:
                </strong>
                <span
                  className={`status   ${appointment?.status.toLowerCase()}`}
                >
                  <p class="confirmed f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  mb-0 fs-xs-13 textani">
                    ✅ Confirmed
                  </p>
                </span>
              </p>
            )}
          </div>
        </div>
        <p className="primary f2 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-14 textani mt-3">
          Prescription
        </p>
        <div className="table-container2 mt-3">
          <div className="table-wrapper">
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Time to Take</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>After Food</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionsview?.map((prescription, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{prescription?.medicineName}</td>
                    <td>{prescription?.dosage}</td>
                    <td>{prescription?.timeToTake}</td>
                    <td>{prescription?.startDate}</td>
                    <td>{prescription?.endDate}</td>
                    <td>{prescription?.afterFood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="action-buttons">
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

export default PationtDetaileViewScreen;
