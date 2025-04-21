import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useUser from "../../Data/Local/userDetail";
import DoctorScheduleCalendar from "../../components/Doctor/Slots/DoctorScheduleCalendar";
import { doctorTimeSlote } from "../../Data/DummyJson";
import { useLocation } from "react-router-dom";
import {
  useLazyAlldoctorstimesloteQuery,
  useLazyGettimeslotsViewQuery,
} from "../../Data/Api/api";
import PageLoad from "../../components/Loading/PageLoad";

const TimeSlotScreen = () => {
  const { user } = useUser();
  const user_id = user?.res?.id;
  const type = user?.type;

  const location = useLocation();
  const stateData = location?.state;
  console.log("stateData", stateData, type);

  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false); // ✅ Start with no popup
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Api
  const [getAllSlotesApi] = useLazyAlldoctorstimesloteQuery();
  const [gettimeSlotebyDate] = useLazyGettimeslotsViewQuery();

  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formatted = formatDate(date);
      const todayFormatted = formatDate(new Date());
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      if (formatted === todayFormatted) {
        return "today-active"; // This should override others
      }

      if (bookedDates.includes(formatted)) {
        return "booked-date";
      }

      if (isWeekend) {
        return "weekend";
      }
    }
    return null;
  };

  const formatDateFun = (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (selectedDate) => {
    console.log("selectedDate", selectedDate);
    const formatted = formatDateFun(selectedDate);

    setDate(selectedDate);

    const formattedDate = formatDateFun(selectedDate); // ✅ call the function here

    if (bookedDates.includes(formattedDate)) {
      setLoading(true);
      const id = user_id;
      gettimeSlotebyDate({ id: id, date: formattedDate }) // ✅ pass the formatted string
        .unwrap()
        .then((res) => {
          console.log("Res", res);
          setSelectedDateSlots(res?.timeSlots || []); // ✅ this was also wrong, you had `selectedDateSlots(res);`
          setShowPopup(true);
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setShowPopup(true);
      setSelectedDateSlots([]);
    }

    // ✅ Show popup only when date clicked

    // const slots = doctorTimeSlote.data.filter(
    //   (slot) => slot.date === formatted
    // );
    // setSelectedDateSlots(slots);
  };

  const getFullSloteFun = () => {
    setLoading(true);
    const id = stateData?.id || user_id;
    console.log("idididididid", id);
    getAllSlotesApi(id)
      .unwrap()
      .then((res) => {
        console.log("SLRess", res);
        const slotDates = res?.timeSlots
          .filter((slot) => slot.date)
          .map((slot) => slot.date);
        const uniqueDates = [...new Set(slotDates)];
        setBookedDates(uniqueDates);
        console.log("uniqueDates", uniqueDates);

        // ✅ Just set today slots silently, no popup
        const todayFormatted = formatDate(new Date());
        const todaySlots = res?.timeSlots.filter(
          (slot) => slot?.date === todayFormatted
        );
        setSelectedDateSlots(todaySlots);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFullSloteFun();
  }, []);

  const convertTo12HourFormat = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div>
      {loading && <PageLoad />}
      <div className="big-calendar-container">
        <h1 className="calendar-title primary f2">📅 Your Time Slots</h1>
        <div className="calendar-box">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={tileClassName}
            tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)}
          />
        </div>
      </div>

      {/* ✅ Popup only shows after click */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              ❌
            </button>
            <h2>📅 Selected Date: {formatDate(date)}</h2>

            {selectedDateSlots.length > 0 ? (
              <div className="slot-list-box">
                <h3>🕒 Time Slots</h3>
                <div className="slot-box-wrapper">
                  {selectedDateSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`slot-box ${
                        slot.booked ? "booked" : "available"
                      }`}
                    >
                      <div className="slot-time">
                        {convertTo12HourFormat(slot.startTime)} -{" "}
                        {convertTo12HourFormat(slot.endTime)}
                      </div>
                      <div className="slot-clinic">{slot.clinicName}</div>
                      <div className="slot-status">
                        {slot.booked ? "🟥 Booked" : "🟩 Available"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <DoctorScheduleCalendar
                setLoading={setLoading}
                setShowPopup={setShowPopup}
                selectedDate={formatDate(date)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotScreen;
