import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const AppoinmentList = ({ datas }) => {
  console.log("datdatasas", datas);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = datas.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(datas.length / recordsPerPage);

  const handleNext = () => {
    if (currentPage < nPages) setCurrentPage(currentPage + 1);
  };

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

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  console.log("currentRecords?.length", datas);

  return (
    <div class="table-container">
      <div className="d-flex ac-jb">
        <p className="primary text-uppercase f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
          Appointment List
        </p>
        <button
          onClick={() => {
            navigate("/patient/doctors");
          }}
          className=" download-all bg-primarys white f2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani border-0  rounded-2 py-2 px-3"
        >
          Book your Appoinment
        </button>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                S.No
              </th>
              <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Doctor Name
              </th>
              <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Appointment Date
              </th>
              <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Time
              </th>
              <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Duration
              </th>
              <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Status
              </th>
              {/* <th className=" white f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13  fs-xs-13 textani">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {currentRecords?.map((item, index) => {
              return (
                <tr
                  className="cp"
                  onClick={() => {
                    navigate("/patient/appointment/detail", {
                      state: item,
                    });
                  }}
                >
                  <td className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                    {firstIndex + index + 1}
                  </td>
                  <td className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                    {` ${item?.timeSlot?.doctor?.firstName} ${item?.timeSlot?.doctor?.lastName}`}
                  </td>
                  <td className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                    {item?.timeSlot?.date}
                  </td>
                  <td className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                    {` ${formatTimeToAMPM(
                      item?.timeSlot?.startTime
                    )} To ${formatTimeToAMPM(item?.timeSlot?.endTime)}`}
                  </td>
                  <td className="f1 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                    {` ${item?.timeSlot?.duration} minutes`}
                  </td>
                  {item?.cancelled ? (
                    <td class="cancelled f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                      ❌ Cancelled
                    </td>
                  ) : item?.status == "IN_PROGRESS" ? (
                    <td class="pending f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                      ⏳ Progress
                    </td>
                  ) : (
                    item?.status == "COMPLETED" && (
                      <td class="green f3 fs-xxl-15 fs-xl-15 fs-lg-14 black fs-sm-13  fs-xs-13 textani">
                        ✔ Completed
                      </td>
                    )
                  )}
                  {/* <td>
                    <button
                      onClick={() => {
                        navigate("/patient/appointment/detail", {
                          state: item,
                        });
                      }}
                      class="btnss f1 fs-xxl-16 fs-xl-16 fs-lg-15 bg-transparent black fs-sm-15  fs-xs-15 textani w-md-100 w-100"
                    >
                      View Details
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {datas?.length > recordsPerPage && (
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
