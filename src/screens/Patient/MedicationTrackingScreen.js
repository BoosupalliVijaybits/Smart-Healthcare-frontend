import React, { useEffect, useRef, useState } from "react";
import useUser from "../../Data/Local/userDetail";
import { useLazyPatientpriscribeviewQuery } from "../../Data/Api/api";
import PageLoad from "../../components/Loading/PageLoad";
import EmptyScreen from "../../components/Common/EmptyScreen";
import { notfound } from "../../assets/image";

const MedicationTrackingScreen = () => {
  const { user, setUser } = useUser();

  const user_id = user?.res?.id;
  console.log("user_id", user_id);

  const componentRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [priscriptions, setPriscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  const [mypriscription] = useLazyPatientpriscribeviewQuery();

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = priscriptions.slice(indexOfFirstRow, indexOfLastRow);
  const firstIndex = indexOfLastRow - rowsPerPage;

  const nextPage = () => {
    if (currentPage < Math.ceil(priscriptions.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // saskHandle Previous Page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

  const priscribFun = () => {
    setLoading(true);
    mypriscription(user_id)
      .unwrap()
      .then((res) => {
        console.log("prisres", res);
        setPriscriptions(res || []);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    priscribFun();
  }, []);

  console.log("priscriptionscurrentRows", currentRows);

  return (
    <>
      {loading && <PageLoad />}
      {priscriptions?.length == 0 ? (
        <EmptyScreen img={notfound} content={"Prescription Not Found"} />
      ) : (
        <div className="medication-container rounded-3">
          <div className="w-100 d-flex  ac-jb mb-3">
            <h2 className="primary text-uppercase f2 fs-xxl-19 mb-0 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani title">
              🩺 Medication Tracking
            </h2>
          </div>
          <div className="medication-table">
            {/* <div className="full-prescription">
          <button
            className="btn download-all bg-primarys white f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani primary"
            onClick={downloadFullPrescription}
          >
            📥 Download Prescription
          </button>
        </div> */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
              border="1"
            >
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
                    Appointment ID
                  </th>

                  <th
                    style={{
                      color: "#fff",
                    }}
                    className=" f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani"
                  >
                    Doctor ID
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
                {currentRows.map((prescription, index) => (
                  <tr key={index}>
                    <td>{firstIndex + index + 1}</td>
                    <td>{prescription?.id}</td>
                    <td>{prescription?.doctorResponse?.id}</td>
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
            {priscriptions?.length > rowsPerPage && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={prevPage}
                  className={`${
                    currentPage == 1 && "opacityf"
                  } bg-transparent px-3 mx-1 py-1 page-btn rounded-2 f2 fs-xxl-14 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani primary`}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani primary">
                  Page {currentPage} of{" "}
                  {Math.ceil(priscriptions.length / rowsPerPage)}
                </span>
                <button
                  className={`${
                    currentPage ===
                      Math.ceil(priscriptions.length / rowsPerPage) &&
                    "opacityf"
                  }  bg-transparent px-3 mx-1 py-1 page-btn rounded-2 f2 fs-xxl-14 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani primary`}
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(priscriptions.length / rowsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* ✅ Hidden Content for PDF */}
          <div ref={componentRef} style={{ display: "none" }}>
            <div className="hospital-header">
              <h2>XYZ Multi-Speciality Hospital</h2>
              <p>24, Park Road, Chennai - 600001</p>
              <p>Phone: +91 9876543210</p>
            </div>
            <hr />
            <h3 style={{ textAlign: "center" }}>🩺 Patient Prescription</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Time to Take</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {priscriptions.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.dosage}</td>
                    <td>{item.time}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="doctor-signature">
              <p>
                <strong>Doctor's Name:</strong> Dr. John Smith
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
      )}
    </>
  );
};

export default MedicationTrackingScreen;
