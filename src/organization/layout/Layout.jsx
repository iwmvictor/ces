import React from "react";
import OrgHeader from "./Header";
import OrgFooter from "./Footer";
import { Outlet } from "react-router-dom";

const OrgLayout = () => {
  return (
    <>
      <OrgHeader />
      <Outlet />
      <OrgFooter />
    </>
  );
};

export default OrgLayout;
