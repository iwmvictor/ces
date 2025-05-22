import React, { useState, useEffect } from "react";
import axios from "axios";
import { agencies, assets, citizens } from "../assets/asset";
import { IoSearch } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { GoOrganization } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingOrganizations, setLoadingOrganizations] = useState(true);

  const fetchUsers = async () => {
    // const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    const token =
      "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AZ21haWwuY29t.s2UEp66crFo8_8Oc1HPR2qoDasFT2dgxksdLINAAz1k";
    if (!token) {
      console.error("No authorization token found.");
      return;
    }

    try {
      const response = await axios.get(
        "https://cces-be.onrender.com/api/auth/users",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from localStorage
          },
        }
      );
      console.log(response.data); // Log users data to check the format
      setUsers(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchOrganizations = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No authorization token found.");
      return;
    }

    try {
      const response = await axios.get(
        "https://cces-be.onrender.com/api/organization",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from localStorage
          },
        }
      );
      console.log(response.data); // Log organizations data to check the format
      setOrganizations(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoadingOrganizations(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrganizations();
  }, []);

  // Display loading state or data
  const renderLoading = () => {
    return <div>Loading...</div>;
  };

  return (
    <>
      <div className="admin-home">
        <div className="home__header">
          <div className="content">
            <div>
              <h2>Dashboard</h2>
            </div>
            <div className="header__action">
              <div className="input">
                <input type="search" placeholder="Search anything..." />
                <button>
                  <IoSearch />
                </button>
              </div>

              <div>
                <button className="profile">
                  <img src={assets.images.user1} alt="User Profile" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="admin__content">
          <div className="content__overview">
            <div className="overview__title">
              <div>
                <h3>Overview</h3>
              </div>
              <div>
                <select>
                  <option value="">Last week</option>
                  <option value="">Last month</option>
                  <option value="">Last 3 months</option>
                  <option value="">Last year</option>
                  <option value="">Lifetime</option>
                </select>
              </div>
            </div>
            <div className="overview__numbers">
              <div className="number__card active">
                <div className="card__title">
                  <span className="icon">
                    <LuUser />
                  </span>
                  <span>Citizens</span>
                </div>
                <div className="card__content">
                  <span className="card__num">
                    {loadingUsers ? 0 : users.length}
                  </span>
                  <div className="card__text">
                    <span className="percentage">
                      <span className="perc_icon">
                        <IoIosTrendingUp />
                      </span>
                      <span> 36.8%</span>
                    </span>
                    <span className="txt">vs last month</span>
                  </div>
                </div>
              </div>

              <div className="number__card">
                <div className="card__title">
                  <span className="icon">
                    <GoOrganization />
                  </span>
                  <span>Organizations</span>
                </div>
                <div className="card__content">
                  <span className="card__num">
                    {loadingOrganizations ? 0 : organizations.length}
                  </span>
                  <div className="card__text">
                    <span className="percentage">
                      <span className="perc_icon">
                        <IoIosTrendingDown />
                      </span>
                      <span> 36.8%</span>
                    </span>
                    <span className="txt">vs last month</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="new__users">
              <h4>
                {loadingUsers
                  ? 0
                  : `${users.length || "6"} new citizens today!`}
              </h4>
              <p>Send a welcome message to all new citizens.</p>
              <div className="user_list">
                {citizens.slice(0, 5).map((user, index) => (
                  <div key={index} className="user__box">
                    <div className="img">
                      <img
                        src={user.profileImage || assets.images.user}
                        alt={user.name || "User"}
                      />
                    </div>
                    <div className="txt">
                      <p>{user.name.split(" ").pop() || "Name"}</p>
                    </div>
                  </div>
                ))}
                <Link to={"/admin/citizens"} className="view_all">
                  <div className="icon">
                    <BsArrowRight />
                  </div>
                  <div className="txt">
                    <p>View all</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="content__popular">
            <div className="content">
              <h3>Latest organizations</h3>

              <div className="agency__list">
                {!loadingOrganizations
                  ? 0
                  : agencies.slice(0, 5).map((org, index) => (
                      <div key={index} className="agency">
                        <div className="img">
                          <img
                            src={org.logo || assets.images.user}
                            alt={org.name || "Organization"}
                          />
                        </div>
                        <div className="name">
                          <h4>{org.name || "Organization Name"}</h4>
                          <p>{org.category || "Categories"}</p>
                        </div>
                      </div>
                    ))}

                <div className="button">
                  <Link to={"/admin/organizations"}>View all</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
