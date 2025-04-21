import React, { useState } from "react";
import axios from "axios";
import { useDoctortimeslotMutation } from "../../../Data/Api/api";
import useUser from "../../../Data/Local/userDetail";

const AllocateTimeSlotsForm = ({ selectedDate }) => {
  const { user } = useUser();
  const doctor_id = user?.res?.id;
  const [formData, setFormData] = useState({
    date: selectedDate,
    clinicName: "",
    startTime: "",
    endTime: "",
    duration: "",
  });

  const [message, setMessage] = useState("");

  // Api
  const [timeSlotApi] = useDoctortimeslotMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFutureTime = (date, time) => {
    const selected = new Date(`${date}T${time}`);
    return selected > new Date();
  };

  const getMinTime = (selectedDate) => {
    const today = new Date().toISOString().split("T")[0];
    if (selectedDate === today) {
      return new Date().toTimeString().slice(0, 5); // HH:MM
    }
    return "00:00";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, startTime, endTime } = formData;

    if (!isFutureTime(date, startTime) || !isFutureTime(date, endTime)) {
      setMessage("❌ Please select future times only.");
      return;
    }

    if (endTime <= startTime) {
      setMessage("❌ End time must be after start time.");
      return;
    }

    const payload = {
      date: formData?.date,
      clinicName: formData?.clinicName,
      endTime: `${formData.endTime}:00`,
      startTime: `${formData.startTime}:00`,
      duration: formData?.duration,
    };
    timeSlotApi(payload)
      .unwrap()
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🕐 Allocate Doctor Time Slot</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="date"
          type="date"
          disabled
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
          required
          min={new Date().toISOString().split("T")[0]}
        />
        <input
          name="clinicName"
          type="text"
          placeholder="Clinic Name"
          value={formData.clinicName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          style={styles.input}
          required
          min={getMinTime(formData.date)}
        />
        <input
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          style={styles.input}
          required
          min={formData.startTime}
        />
        <input
          name="duration"
          type="number"
          placeholder="Duration (minutes)"
          value={formData.duration}
          onChange={handleChange}
          style={styles.input}
          required
          min="1"
        />
        <button type="submit" style={styles.button}>
          📥 Submit Slot
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: "480px",
    margin: "40px auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    fontSize: "16px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#861c3f",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "15px",
    color: "#e91e63",
  },
};

export default AllocateTimeSlotsForm;
