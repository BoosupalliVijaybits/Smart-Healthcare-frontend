import React from "react";
import { FaStar } from "react-icons/fa";
import { review_empty } from "../../../assets/image";

const ReviewList = ({ reviewList }) => {
  return (
    <div className="review-list gap-3 rounded-4 position-relative">
      {reviewList?.length == 0 ? (
        <div className="d-flex ac-jc flex-column">
          <div
            className="d-flex ac-jc"
            style={{
              height: "100px",
              width: "100px",
            }}
          >
            <img
              style={{
                objectFit: "contain",
                height: "100%",
                width: "100%",
              }}
              src={review_empty}
            />
          </div>
          <p className="mb-0">Review Not Found</p>
        </div>
      ) : (
        <div className="">
          {reviewList.map((review) => (
            <div className="review-card mb-3" key={review.id}>
              <div className="review-header mb-0">
                {/* <img src={review.profilePic} alt={review.name} /> */}
                <div>
                  <h4>{review.name}</h4>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={16}
                        color={i < review.rating ? "#FFD700" : "#ccc"}
                        stroke="none"
                      />
                    ))}
                  </div>
                  <span className="date">{review.date}</span>
                </div>
              </div>
              {review.comments && (
                <p className="review-content mb-0">{review.comments}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
