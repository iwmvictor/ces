import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/asset";
import { Link } from "react-router-dom";

const OrganizationHome = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("User not authenticated");

        const response = await axios.get(
          "https://cces-be.onrender.com/api/feedback/organization",
          {
            headers: {
              Authorization: token,
              Accept: "application/json",
            },
          }
        );

        setFeedbacks(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="agency-home">
      <div className="container">
        <div className="page-title">
          <h3>All Complaints</h3>
        </div>
        <div className="content">
          {loading ? (
            <p className="load">Loading feedback...</p>
          ) : error ? (
            <p className="error">Error: {error}</p>
          ) : (
            feedbacks.map((item) => (
              <Link
                to={`/organization/complaint/${item.ticket}`}
                key={item.id}
                className="feedback-card"
              >
                <div className="img">
                  <img
                    src={item.galleryImages[0] || assets.images.placeholder}
                  />
                  <div className="ticket">
                    {item.ticket || item.responseStatus}
                  </div>
                </div>
                <div className="description">
                  <h4>{item.location}</h4>
                  <span className="category">{item.category}</span>
                  <p>{item.phoneNumber}</p>
                  <div className="status">
                    <span>{item.feedbackStatus}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationHome;
