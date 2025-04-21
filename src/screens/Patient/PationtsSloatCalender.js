import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useUser from "../../Data/Local/userDetail";
import DoctorScheduleCalendar from "../../components/Doctor/Slots/DoctorScheduleCalendar";
import { doctorTimeSlote } from "../../Data/DummyJson";

const PationtsSloatCalender = () => {
  const { user } = useUser();
  const id = user?.res?.id;

  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false); // ✅ Start with no popup
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);

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

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setShowPopup(true); // ✅ Show popup only when date clicked

    const formatted = formatDate(selectedDate);
    const slots = doctorTimeSlote.data.filter(
      (slot) => slot.date === formatted
    );
    setSelectedDateSlots(slots);
  };

  useEffect(() => {
    const slotDates = doctorTimeSlote.data
      .filter((slot) => slot.date)
      .map((slot) => slot.date);
    const uniqueDates = [...new Set(slotDates)];
    setBookedDates(uniqueDates);

    // ✅ Just set today slots silently, no popup
    const todayFormatted = formatDate(new Date());
    const todaySlots = doctorTimeSlote.data.filter(
      (slot) => slot.date === todayFormatted
    );
    setSelectedDateSlots(todaySlots);
  }, []);

  return (
    <div>
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
                        {slot.startTime} - {slot.endTime}
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
              <DoctorScheduleCalendar selectedDate={formatDate(date)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PationtsSloatCalender;
