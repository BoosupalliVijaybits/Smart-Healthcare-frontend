import React, { useEffect, useState } from "react";
import {
  useBook_appoinmentMutation,
  useLazyAlldoctorstimesloteQuery,
  useLazyGetreviweQuery,
  useLazyGettimeslotsViewQuery,
  useReview_postMutation,
} from "../../Data/Api/api";
import { useLocation, useNavigate } from "react-router-dom";
import PageLoad from "../../components/Loading/PageLoad";
import { toast } from "react-toastify";
import EmptyScreen from "../../components/Common/EmptyScreen";
import { notfound } from "../../assets/image";
import ReviewList from "../../components/Pationt/Apponment/ReviewList";
import useUser from "../../Data/Local/userDetail";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DoctorFeedbackPopup from "../../components/Pationt/Apponment/DoctorFeedbackPopup";

const PatientDoctorDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const doctor_id = location?.state?.data?.id || location?.state?.id;
  console.log("location", location, user);

  const loginType = user?.type;

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [sloatData, setSloatData] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewPop, setReviewPop] = useState(false);

  const [gettimeSloteApi] = useLazyGettimeslotsViewQuery();
  const [appoinmentApi] = useBook_appoinmentMutation();
  const [getAllSlotesApi] = useLazyAlldoctorstimesloteQuery();
  const [getReviewApi] = useLazyGetreviweQuery();
  const [addreviewApi] = useReview_postMutation();

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hour, 10));
    date.setMinutes(parseInt(minute, 10));
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Helper to check if a slot is in the past
  const isPastSlot = (slot) => {
    const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
    return slotDateTime.getTime() <= new Date().getTime();
  };

  const getSloatLIst = () => {
    setLoading(true);
    getAllSlotesApi(doctor_id)
      .unwrap()
      .then((res) => {
        console.log("res", res);

        const now = new Date();
        const filteredSlots = (res?.timeSlots || []).filter((slot) => {
          const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
          return slotDateTime > now;
        });
        setSloatData(filteredSlots);
        getReviewlist();
      })
      .catch((err) => {
        console.error("Error fetching slots:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getReviewlist = () => {
    setLoading(true);
    const id = doctor_id;
    getReviewApi(id)
      .unwrap()
      .then((res) => {
        console.log("revres", res);
        setReviewList(res);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const bookAppoinment = () => {
    if (!selectedSlot) return;

    setLoading(true);
    const payload = {
      timeSlotId: selectedSlot.id,
    };

    appoinmentApi(payload)
      .unwrap()
      .then((res) => {
        console.log("res", res);

        toast.success("Appointment Confirmed!");
        setSelectedSlot(null);
        getSloatLIst();
      })
      .catch((err) => {
        toast.error(err?.data?.message || "BAD_REQUEST");
        setSelectedSlot(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSloatLIst();
  }, []);

  const groupedSlots = sloatData.reduce((acc, slot) => {
    acc[slot.date] = acc[slot.date] || [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  const now = new Date();

  const futureSlots = sloatData.filter((slot) => {
    const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
    return slotDateTime > now;
  });

  const groupedFutureSlots = futureSlots.reduce((acc, slot) => {
    acc[slot.date] = acc[slot.date] || [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  console.log("groupedFutureSlots", groupedFutureSlots, futureSlots);

  const appRating = (data) => {
    if (data?.rating) {
      setLoading(true);
      console.log("datsdatadataa", data);
      const payload = {
        doctorId: doctor_id,
        rating: data?.rating,
        comments: data?.message,
      };
      addreviewApi(payload)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          setReviewPop(false);
          getSloatLIst();
          toast.success(res?.message || "Feedback submitted successfully");
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setReviewPop(!reviewPop);
    }
  };

  return (
    <div className="appointment-container">
      {reviewPop && <DoctorFeedbackPopup onSubmit={appRating} />}
      {loading && <PageLoad />}
      {Object.keys(groupedSlots).length > 0 && (
        <h2 className="appointment-heading text-start f2 fs-xxl-25 fs-xl-24 fs-lg-23 fs-sm-20 fs-xs-20">
          Appointment Slots
        </h2>
      )}

      <div className="completed-patients-container text-start d-flex w-100 as-jb gap-4">
        <div className={`${loginType == "PATIENT" ? "w-70" : "w-100"}`}>
          {!loading &&
            Object.entries(groupedSlots).map(([date, slots]) => (
              <div key={date} className="slot-group">
                <h3 className="slot-date fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f2">
                  {date}
                </h3>
                <div className="slot-grid">
                  {slots.map((slot) => {
                    const isDisabled = slot.booked || isPastSlot(slot);
                    return (
                      <button
                        key={slot.id}
                        disabled={isDisabled}
                        onClick={() => {
                          if (loginType !== "ADMIN") {
                            setSelectedSlot(slot);
                          }
                        }}
                        className={`slot-button ${
                          isDisabled ? "booked opacity-75 bg-primary1" : ""
                        } position-relative `}
                      >
                        <div
                          className={`${
                            isDisabled ? "black" : "white"
                          } slot-time fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f4`}
                        >
                          {formatTime(slot.startTime)} -{" "}
                          {formatTime(slot.endTime)}
                        </div>
                        <div
                          className={`${
                            isDisabled ? "black" : "white"
                          } slot-clinic fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f4`}
                        >
                          {slot.clinicName}
                        </div>
                        {!isDisabled && (
                          <div className="error-cont">
                            <p className="mb-0 bgreeb">Available</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          {!loading && Object.keys(groupedSlots).length === 0 && (
            <EmptyScreen img={notfound} content="No Slots Available" />
          )}
        </div>
        {/* {loginType == "PATIENT" && groupedSlots?.length > 0 && ( */}
        {loginType == "PATIENT" && (
          <div className="w-40">
            <div className="post-reviewbtn d-flex ac-jb mb-3">
              <p className="mb-0 slot-date fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f3">
                All Review
              </p>{" "}
              <button
                onClick={() => {
                  setReviewPop(true);
                }}
                className="mb-0 slot-date fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f4 rounded-5"
              >
                <RateReviewOutlinedIcon /> Write review
              </button>
            </div>
            <ReviewList reviewList={reviewList} />
          </div>
        )}
      </div>

      {selectedSlot && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="modal-title">Confirm Appointment</h3>
            <p className="modal-details">
              {selectedSlot.date} — {formatTime(selectedSlot.startTime)} to{" "}
              {formatTime(selectedSlot.endTime)}
              <br />
              <span>{selectedSlot.clinicName}</span>
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setSelectedSlot(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button onClick={bookAppoinment} className="confirm-btn">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDoctorDetailScreen;
