import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const AppoinmentList = ({ data }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = data.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const handleNext = () => {
    if (currentPage < nPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div class="table-container">
      {/* <div className="d-flex ac-jb">
        <p className="primary text-uppercase f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
          Patient's Appointment List
        </p>
        <button
          onClick={() => {
            navigate("/patient/doctors");
          }}
          className=" download-all bg-primarys white f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani border-0  rounded-2 py-2 px-3"
        >
          Book your Appoinment
        </button>
      </div> */}
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                S.No
              </th>
              {/* <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Doctor Name
              </th> */}
              <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Appointment Date
              </th>
              <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Time
              </th>
              {/* <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Status
              </th> */}
              <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords?.map((item, index) => {
              return (
                <tr>
                  <td className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                    {item?.id}
                  </td>
                  {/* <td className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                    {item?.doctorName}
                  </td> */}
                  <td className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                    {item?.appointmentDate}
                  </td>
                  <td className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                    {item?.appointmentTime}
                  </td>
                  {/* {item?.status == "Confirmed" ? (
                    <td class="confirmed f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                      ✅ Confirmed
                    </td>
                  ) : item?.status == "Pending" ? (
                    <td class="pending f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                      ⏳ Pending
                    </td>
                  ) : item?.status == "Cancelled" ? (
                    <td class="cancelled f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                      ❌ Cancelled
                    </td>
                  ) : (
                    <td class="completed f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                      ✔ Completed
                    </td>
                  )} */}
                  <td>
                    <button
                      onClick={() => {
                        navigate("/doctor/today-appointment/detail", {
                          state: item,
                        });
                      }}
                      class="btnss f1 fs-xxl-16 fs-xl-16 fs-lg-15 bg-transparent black fs-sm-15  fs-xs-15 textani w-md-70 wi-100"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data?.length > 5 && (
        <div className="pagination w-100 d-flex ac-je mt-4">
          <button
            className={`${
              currentPage == 1 && "opacityf"
            } bg-transparent px-4 mx-2 py-1 page-btn rounded-2 `}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <ArrowBackIosIcon className="f3 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-16 fs-xs-16 textani primary" />
          </button>
          <span className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani primary">
            Page {currentPage} of {nPages}
          </span>
          <button
            className={`${
              currentPage == nPages && "opacityf"
            }  bg-transparent px-4 mx-2 py-1 page-btn rounded-2 `}
            onClick={handleNext}
            disabled={currentPage === nPages}
          >
            <ArrowForwardIosIcon className="f3 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-16 fs-xs-16 textani primary" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AppoinmentList;
