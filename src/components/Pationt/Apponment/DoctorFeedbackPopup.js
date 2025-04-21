import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorFeedbackPopup = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }
    onSubmit({ rating, message });
  };

  return (
    <div className="feedback-overlay">
      <div className="feedback-popup">
        <ToastContainer position="top-right" autoClose={3000} />
        <button className="close-btn" onClick={onSubmit}>
          &times;
        </button>
        <h2>Rate Your Doctor</h2>

        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  onClick={() => setRating(starValue)}
                />
                <FaStar
                  className="star"
                  color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  size={30}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        <textarea
          placeholder="Leave your feedback (optional)..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DoctorFeedbackPopup;
