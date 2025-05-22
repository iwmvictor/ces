import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets, ceshq } from "../assets/asset";
import { TfiEmail } from "react-icons/tfi";

import "./../style/auth.scss";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const isImage =
    typeof ceshq.logo === "string" &&
    /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(ceshq.logo);

  // State to handle form inputs
  const [email, setEmail] = useState("");

  // State to handle errors or success messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://cces-be.onrender.com/api/auth/request-password-reset",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset email sent!");
        setError(null);

        // Redirect to reset password page
        setTimeout(() => navigate("/auth/reset-password"), 2000);
      } else {
        setSuccess(null);
        setError(data.message || "Failed to send reset email. Try again.");
      }
    } catch (error) {
      setError("Network error: " + error.message);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="login">
          <div className="brand">
            <div className="brand__content">
              <Link to={"/"} className="logo">
                {isImage ? (
                  <img src={ceshq.logo} alt="Logo" />
                ) : (
                  <h2>{ceshq.logo}</h2>
                )}
              </Link>

              <div className="contacts__list">
                <div className="div">
                  <div className="icon">
                    <TfiEmail />
                  </div>
                  <div className="text">
                    <h4>Forgot your password?</h4>
                    <p>
                      Enter your email, and we'll send you instructions to reset
                      your password.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="login__content">
            <h1>Citizen Complaint & Engagement System</h1>
            <h3>Request a password reset</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="forgot-password">
                <Link to="/auth/login">Back to Login</Link>
              </div>

              <div className="form-group">
                <button type="submit" disabled={loading}>
                  {loading
                    ? "Sending..."
                    : success
                    ? "Email Sent"
                    : "Send Reset Link"}
                </button>
              </div>
            </form>

            <div className="other">
              <p>
                Remembered your password? <Link to="/auth/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
