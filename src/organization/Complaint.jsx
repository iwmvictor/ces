import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LuUser, LuVoicemail } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import Gallery from "../component/Gallery";
import { assets } from "../assets/asset";

const ComplaintPage = () => {
  const { path } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [citizen, setCitizen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        if (!token) throw new Error("User not authenticated");

        const { data } = await axios.get(
          "https://cces-be.onrender.com/api/feedback/organization",
          {
            headers: {
              Authorization: token,
              Accept: "application/json",
            },
          }
        );

        const result = data.data.find((item) => item.ticket === path);
        if (!result) throw new Error("Complaint not found");

        setComplaint(result);

        // Fetch citizen info
        const citizenResponse = await axios.get(
          `https://cces-be.onrender.com/api/auth/users/${result.userId}`,
          {
            headers: { Authorization: token },
          }
        );
        setCitizen(citizenResponse.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [path, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!complaint || !user) return;

    try {
      await axios.post(
        "https://cces-be.onrender.com/api/response",
        {
          subject,
          description,
          feedbackId: complaint.id,
          organizationId: user.id,
          galleryImages: gallery.length ? gallery : ["string"], // adjust as needed
        },
        {
          headers: {
            Authorization: token,
            Accept: "application/json",
          },
        }
      );
      alert("Response sent successfully!");
    } catch (err) {
      alert("Failed to send response");
    }
  };

  return (
    <div className="complaint-page">
      <div className="container">
        <div className="content">
          {loading ? (
            <p>Loading complaint details...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : complaint ? (
            <div className="complaint__page">
              <div className="complaint">
                <div className="comp__gallery">
                  <Gallery images={complaint.galleryImages} />
                </div>
                <div className="description">
                  <div className="category">
                    <span>{complaint.category}</span>
                    <span className="ticket">{complaint.ticket}</span>
                  </div>
                  <p className="descr">{complaint.description}</p>

                  <div className="personal">
                    <h4>About Citizen</h4>
                    <div className="user__name">
                      <span className="icon">
                        <LuUser />
                      </span>
                      <span>
                        {citizen
                          ? `${citizen.firstName} ${citizen.lastName}`
                          : "-"}
                      </span>
                    </div>
                    <div className="user__phone">
                      <span className="icon">
                        <LuVoicemail />
                      </span>
                      <span>{complaint.phoneNumber}</span>
                    </div>
                    <div className="user__location">
                      <span className="icon">
                        <IoLocationOutline />
                      </span>
                      <span>{complaint.location}</span>
                    </div>
                  </div>
                </div>

                {complaint.response && complaint.response.length > 0 && (
                  <div className="complaint__response">
                    <h4>Response</h4>
                    {complaint.response.map((res) => (
                      <div className="response__card" key={res.id}>
                        <div className="responder__name">
                          <span className="icon">
                            <LuUser />
                          </span>
                          <span>
                            {res.organization?.name || "Organization"}
                          </span>
                        </div>
                        <span className="response__topic">{res.subject}</span>
                        <span className="response__description">
                          {res.description}
                        </span>
                        <div className="response__gallery">
                          {res.galleryImages.map((img, i) => (
                            <img
                              key={i}
                              src={img || assets.images.placeholder}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="response__form">
                <h3>Send response to this compliant</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-input">
                    <input
                      type="text"
                      placeholder="Subject.."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="form-text">
                    <textarea
                      placeholder="Description.."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-gallery">
                    <input
                      type="file"
                      onChange={(e) => setGallery([e.target.value])}
                    />
                  </div>
                  <div className="form-input">
                    <button type="submit">Send Response</button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <p>Complaint not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;
