import React from "react";
import LandingHeader from "./Header";
import { Outlet } from "react-router-dom";
import LandingFooter from "./Footer";
import LHeader from "./Header";
import LFooter from "./Footer";

const LandingLayout = () => {
  return (
    <div>
      <LHeader />
      <Outlet />
      <LFooter />
    </div>
  );
};

export default LandingLayout;
