import React from "react";
import AdminSidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AdminSidebar />
      <div className="admin-outlet">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
