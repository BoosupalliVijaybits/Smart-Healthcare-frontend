import React, { useState, useEffect } from "react";
import { addMinutes, format } from "date-fns";

const TimeSlotModal = ({ selectedDate, onAddOrEditEvent, onClose }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(15);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (startTime && endTime && duration) {
      generateTimeSlots();
    }
  }, [startTime, endTime, duration]);

  const generateTimeSlots = () => {
    const start = new Date(selectedDate);
    const [startHours, startMinutes] = startTime.split(":");
    start.setHours(parseInt(startHours, 10), parseInt(startMinutes, 10));

    const end = new Date(selectedDate);
    const [endHours, endMinutes] = endTime.split(":");
    end.setHours(parseInt(endHours, 10), parseInt(endMinutes, 10));

    const slots = [];
    let current = start;

    while (current < end) {
      const slotEnd = addMinutes(current, duration);
      if (slotEnd <= end) {
        slots.push({
          title: "Available",
          start: new Date(current),
          end: new Date(slotEnd),
        });
      }
      current = slotEnd;
    }

    setTimeSlots(slots);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrEditEvent({
      title: "Available Slots",
      start: timeSlots[0].start,
      end: timeSlots[timeSlots.length - 1].end,
      slots: timeSlots,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Manage Time Slots for {format(selectedDate, "PPP")}</h4>
        <form onSubmit={handleSubmit}>
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>
          <label>
            Duration (minutes):
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              required
              min="5"
              step="5"
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Save Time Slots</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeSlotModal;
