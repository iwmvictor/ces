import React from "react";
import { Link, NavLink } from "react-router-dom";

const LFooter = () => {
  return (
    <>
      <div className="landing-footer">
        <div className="lcontainer">
          <div className="content">
            <div className="copy">
              <p>
                &copy; {new Date().getFullYear()} Inteko. All right reserved.
              </p>
            </div>
            <div className="links">
              <ul>
                <li>
                  <NavLink to={"/auth/login"}>Login Portal</NavLink>
                </li>
                <li>
                  <NavLink to={"/admin"}>Admin Portal</NavLink>
                </li>
                <li>
                  <NavLink to={"/terms"}>Privacy Policy</NavLink>
                </li>
                <li>
                  <NavLink to={"/blog"}>Blog</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LFooter;
