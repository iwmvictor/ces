import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets, ceshq } from "../assets/asset";
import "./../style/auth.scss";
import { IoCallOutline, IoChatbubblesOutline } from "react-icons/io5";
import { PiMapPinArea } from "react-icons/pi";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://cces-be.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password has been reset successfully.");
        setError(null);
        setTimeout(() => navigate("/auth/login"), 3000); // redirect after success
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="reset login">
          <div className="brand">
            <div className="brand__content">
              <Link to={"/"} className="logo">
                {typeof ceshq.logo === "string" &&
                /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(ceshq.logo) ? (
                  <img src={ceshq.logo} alt="Logo" />
                ) : (
                  <h2>{ceshq.logo}</h2>
                )}
              </Link>

              <div className="contacts__list">
                <div className="div">
                  <div className="icon">
                    <IoChatbubblesOutline />
                  </div>
                  <div className="text">
                    <h4>Chat with us</h4>
                    <p>Our friendly team is here to help.</p>
                    <Link to={`mailto:${ceshq.email.info}`}>
                      {ceshq.email.info}
                    </Link>
                  </div>
                </div>
                <div className="div">
                  <div className="icon">
                    <PiMapPinArea />
                  </div>
                  <div className="text">
                    <h4>Office</h4>
                    <p>Come say hello at our office HQ.</p>
                    <Link>
                      {ceshq.address.city}, {ceshq.address.country} <br />
                      {ceshq.address.street}
                    </Link>
                  </div>
                </div>
                <div className="div">
                  <div className="icon">
                    <IoCallOutline />
                  </div>
                  <div className="text">
                    <h4>Phone</h4>
                    <p>Mon-Fri from 9am to 5pm.</p>
                    <Link to={`tel:${ceshq.phone.support}`}>
                      {ceshq.phone.support}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reset__content login__content">
            <h1>Reset your password</h1>
            <h3>Enter the OTP and your new password</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP (e.g., 666I66)"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>

            <div className="other">
              <p>
                Back to <Link to="/auth/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
