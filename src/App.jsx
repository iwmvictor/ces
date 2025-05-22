import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingHome from "./citizen/Home";
import AdminHome from "./admin/Home";
import AdminSupport from "./admin/Support";
import AdminOrganizations from "./admin/Agency";
import AdminLayout from "./admin/layout/Layout";
import AdminUsers from "./admin/User";
import AdminSetting from "./admin/Setting";
import Login from "./auth/Login";
import ResetPassword from "./auth/Reset";
import ForgotPassword from "./auth/Forgot";
import Register from "./auth/Register";
import OrgLayout from "./organization/layout/Layout";
import OrganizationHome from "./organization/Home";
import UnresolvedComplaint from "./organization/Unresolved";
import ResolvedComplaint from "./organization/Resolved";
import ComplaintPage from "./organization/Complaint";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LandingHome />} />

          <Route path="auth" element={<Login />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
          <Route path="auth/reset-password" element={<ResetPassword />} />

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="citizens" element={<AdminUsers />} />
            <Route path="organizations" element={<AdminOrganizations />} />
            <Route path="setting" element={<AdminSetting />} />
            <Route path="support" element={<AdminSupport />} />
          </Route>

          <Route path="organization" element={<OrgLayout />}>
            <Route path="complaint/:path" element={<ComplaintPage />} />
            <Route path="complaint/all" element={<OrganizationHome />} />
            <Route path="complaint/open" element={<UnresolvedComplaint />} />
            <Route path="complaint/resolved" element={<ResolvedComplaint />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
