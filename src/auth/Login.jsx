import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets, ceshq } from "../assets/asset";
import { IoCallOutline, IoChatbubblesOutline } from "react-icons/io5";
import { PiMapPinArea } from "react-icons/pi";

import "./../style/auth.scss";

const Login = () => {
  const navigate = useNavigate();
  const isImage =
    typeof ceshq.logo === "string" &&
    /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(ceshq.logo);

  // State to handle form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to handle errors or success messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://cces-be.onrender.com/api/auth/signin",
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
        const userData = data.data;

        if (userData?.token) {
          localStorage.setItem("authToken", userData.token);
        } else {
          console.warn("No token returned from API");
        }

        const { token, ...userInfo } = userData;

        if (Object.keys(userInfo).length > 0) {
          localStorage.setItem("user", JSON.stringify(userInfo));
        } else {
          console.warn("No user data returned from API");
        }

        setSuccess("Login successful!");
        setError(null);
        setLoading(false);

        const role = userInfo?.roles?.[0];

        switch (role) {
          case "ADMIN":
            navigate("/admin/home");
            break;
          case "ORGANIZATION":
            navigate("/organization/complaint/all");
            break;
          case "CITIZEN":
          default:
            navigate("/complaint");
            break;
        }
      } else {
        setSuccess(null);
        setError(data.message || "Something went wrong, please try again.");
        setLoading(false);
      }
    } catch (error) {
      setError("Network error: " + error.message);
      setSuccess(null);
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
          <div className="login__content">
            <h1>Citizen Compliant & Engagement System</h1>
            <h3>Login to your account</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password ***"
                  required
                />
              </div>

              <div className="forgot-password">
                <Link to="/auth/forgot-password">Forgot your password?</Link>
              </div>

              <div className="form-group">
                <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : success ? "Logged In" : "Login"}
                </button>
              </div>
            </form>

            <div className="other">
              <p>
                Don't have an account? <Link to="/auth/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
