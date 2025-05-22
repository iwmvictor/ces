import React from "react";
import { GoOrganization } from "react-icons/go";
import { IoHelpCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbLogout2, TbUserSquareRounded } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/asset";

import "./../../style/admin.scss";
import { CiLogout } from "react-icons/ci";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    navigate("/auth/login");
  };

  return (
    <>
      <div className="admin-sidebar">
        <div className="content">
          <div className="navs">
            <Link className="logo">
              <img src={assets.images.logo} alt="LOGO" />
            </Link>
            <ul>
              <li>
                <NavLink to={"/admin/home"}>
                  <span>
                    <LuLayoutDashboard />
                  </span>
                  <span className="txt">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/organizations"}>
                  <span>
                    <GoOrganization />
                  </span>
                  <span className="txt">Agency</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/admin/citizens"}>
                  <span>
                    <TbUserSquareRounded />
                  </span>
                  <span className="txt">Users</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="setting">
            <ul>
              <li>
                <Link to={"/admin/support"}>
                  <span>
                    <IoHelpCircleOutline />
                  </span>
                  <span className="txt">Support</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/setting"}>
                  <span>
                    <IoSettingsOutline />
                  </span>
                  <span className="txt">Setting</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <span>
                    <TbLogout2 />
                  </span>
                  <span className="txt">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
