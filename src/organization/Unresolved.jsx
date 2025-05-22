import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/asset";
import { Link } from "react-router-dom";

const UnresolvedComplaint = () => {
  const [unresolvedFeedbacks, setUnresolvedFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnresolvedFeedbacks = async () => {
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

        // Filter where feedbackStatus is NOT RESOLVED
        const unresolved = response.data.data.filter(
          (item) => item.feedbackStatus !== "RESOLVED"
        );

        setUnresolvedFeedbacks(unresolved);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUnresolvedFeedbacks();
  }, []);

  return (
    <div className="agency-home">
      <div className="container">
        <div className="page-title">
          <h3>Unresolved Complaints</h3>
        </div>
        <div className="content">
          {loading ? (
            <p className="load">Loading unresolved feedback...</p>
          ) : error ? (
            <p className="error">Error: {error}</p>
          ) : unresolvedFeedbacks.length === 0 ? (
            <p className="empty">No unresolved complaints found.</p>
          ) : (
            unresolvedFeedbacks.map((item) => (
              <Link
                to={`/organization/complaint/${item.ticket}`}
                key={item.id}
                className="feedback-card"
              >
                <div className="img">
                  <img
                    src={item.galleryImages[0] || assets.images.placeholder}
                    alt="Feedback"
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

export default UnresolvedComplaint;
