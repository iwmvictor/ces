import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets, ceshq } from "../assets/asset";
import { IoCallOutline, IoChatbubblesOutline } from "react-icons/io5";
import { PiMapPinArea } from "react-icons/pi";

import "./../style/auth.scss";

const Register = () => {
  const navigate = useNavigate(); // Use the useNavigate hook instead of useHistory
  const isImage =
    typeof ceshq.logo === "string" &&
    /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(ceshq.logo);

  // State to handle form inputs
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    role: "CITIZEN",
  });

  // State to handle errors or success messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // State to handle the loading state of the button

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://cces-be.onrender.com/api/auth/signup",
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

      console.log("API Response Data:", data);

      if (response.ok && data?.data?.token) {
        const userData = data.data;

        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setSuccess("Registration successful!");
        setError(null);
        setLoading(false);

        // Redirect to home after registration
        navigate("/");
      } else {
        setSuccess(null);
        setError(
          data.message ||
            (!data?.data?.token
              ? "User or token missing from response."
              : "Something went wrong, please try again.")
        );
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
        <div className="register">
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
          <div className="register__content">
            <h1>Citizen Compliant & Engagement System</h1>
            <h3>Create an account</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                />
              </div>
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
              <div className="form-group">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number (25078...)"
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" disabled={loading}>
                  {loading
                    ? "Registering..."
                    : success
                    ? "Registered"
                    : "Register"}
                </button>
              </div>
            </form>
            <div className="other">
              <p>
                Already have an account? <Link to={"/auth/login"}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
