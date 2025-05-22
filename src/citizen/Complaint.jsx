import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ceshq } from "../assets/asset";
import axios from "axios";



const SubmitComplaint = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    category: "",
    description: "",
    location: "",
    galleryImages: [],
  });

  const [showDropdown, setShowDropdown] = useState(false);

  // Get user data
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const token = localStorage.getItem("authToken");
  const userId = user?.id;
  const photo = user?.photo;

  if (!token || !userId) {
    navigate("/login");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      galleryImages: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload images to Cloudinary or your backend
      const uploadedImageUrls = [];

      for (let image of formData.galleryImages) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "lifeline_alert");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dleiqpvue/image/upload",
          data
        );

        uploadedImageUrls.push(res.data.secure_url);
      }

      const payload = {
        phoneNumber: formData.phoneNumber,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        userId: userId,
        galleryImages: uploadedImageUrls,
      };

      await axios.post("https://cces-be.onrender.com/api/feedback", payload, {
        headers: {
          Authorization: token,
        },
      });

      alert("Complaint submitted successfully!");
      navigate("/compliant");
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="submit__complaints">
      <div className="citizen__hero">
        <div className="container">
          <div className="content">
            <Link to={"/compliant"} className="logo">
              <img src={ceshq.logo} alt="logo" />
            </Link>
            <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
              <div className="img">
                <img src={photo} alt="profile" />
              </div>
              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-item">
                    {user.firstName} {user.lastName}
                  </div>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="citizen__home">
        <div className="container">
          <div className="content">
            <div className="our__contacts">
              <h4>Contact Us</h4>
              <h2>Get in Touch with Us</h2>
              <p>
                We're here to help. Whether you're interested in learning more about our services
                or need support, we're happy to assist you.
              </p>
            </div>

            <div className="contact__form">
              <form onSubmit={handleSubmit}>
                <div className="form-input">
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input">
                  <input
                    type="text"
                    name="category"
                    placeholder="Category (e.g. Accident)"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input">
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input">
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-gallery">
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                </div>

                <div className="form-input">
                  <button type="submit">Submit Complaint</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
