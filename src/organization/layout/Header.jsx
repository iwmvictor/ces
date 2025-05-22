import React, { useEffect, useState } from "react";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoMenuOutline, IoSearch } from "react-icons/io5";
import { assets } from "../../assets/asset";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../../style/agency.scss";

const OrgHeader = () => {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";
  const photo = user?.photo || assets.images.user;

  const [allCount, setAllCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [openCount, setOpenCount] = useState(0);

  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchCounts = async () => {
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

        const feedbacks = response.data.data;
        setAllCount(feedbacks.length);
        setResolvedCount(feedbacks.filter(f => f.feedbackStatus === "RESOLVED").length);
        setOpenCount(feedbacks.filter(f => f.feedbackStatus !== "RESOLVED").length);
      } catch (err) {
        console.error("Error fetching complaint counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="agency-header">
      <div className="container">
        <div className="content">
          <div className="title">
            <h3>Welcome back, <span>{user?.lastName || "User"}</span></h3>
            <p>Manage and respond to complaints.</p>
          </div>

          <div className="nav">
            {/* Menu Toggle */}
            <div className="menu">
              <button onClick={() => setShowMenuModal(prev => !prev)}>
                <IoMenuOutline />
              </button>
              {showMenuModal && (
                <div className="menu-modal">
                  <NavLink to="/organization/complaint/all" onClick={() => setShowMenuModal(false)}>All Complaints</NavLink>
                  <NavLink to="/organization/complaint/open" onClick={() => setShowMenuModal(false)}>Open Complaints</NavLink>
                  <NavLink to="/organization/complaint/resolved" onClick={() => setShowMenuModal(false)}>Resolved Complaints</NavLink>
                </div>
              )}
            </div>

            <ul>
              <li>
                <NavLink to={"/organization/complaint/all"}>
                  <span>All complaints</span>
                  <span className="count">{allCount}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/organization/complaint/open"}>
                  <span>Open</span>
                  <span className="count">{openCount}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/organization/complaint/resolved"}>
                  <span>Resolved</span>
                  <span className="count">{resolvedCount}</span>
                </NavLink>
              </li>
            </ul>

            <div className="right">
              <div className="search">
                <button>
                  <IoSearch />
                </button>
              </div>

              {/* Profile Dropdown */}
              <button className="profile" onClick={() => setShowProfileDropdown(prev => !prev)}>
                <div className="img">
                  <img src={photo} alt="profile" />
                </div>
                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    <div className="dropdown-item">{fullName}</div>
                    <NavLink to="/organization/settings" className="dropdown-item" onClick={() => setShowProfileDropdown(false)}>Settings</NavLink>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgHeader;
