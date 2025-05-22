import React from "react";
import {
  IoCallOutline,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoMailOutline,
  IoMenu,
} from "react-icons/io5";
import { ceshq } from "../../assets/asset"; 
import { Link, NavLink } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

import "./../../style/landing.scss";
import { TbBrandLinkedin } from "react-icons/tb";

const LHeader = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatPhone = (phone) => {
    if (!phone || phone.length !== 12) return phone;
    return `${phone.slice(0, 3)}-${phone.slice(3, 5)}-${phone.slice(
      5,
      9
    )}-${phone.slice(9)}`;
  };

  const isImage =
    typeof ceshq.logo === "string" &&
    /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(ceshq.logo);

  return (
    <>
      <div className="landing-header">
        <div className="top">
          <div className="lcontainer">
            <div className="content">
              <ul className="conts">
                <li>
                  <Link to={`tel:${ceshq.phone.support}`}>
                    <span className="icon">
                      <IoCallOutline />
                    </span>
                    <span>{formatPhone(ceshq.phone.support)}</span>
                  </Link>
                </li>
                <li>
                  <Link to={`mailto:${ceshq.email.info}`}>
                    <span className="icon">
                      <IoMailOutline />
                    </span>
                    <span>{ceshq.email.info}</span>
                  </Link>
                </li>
              </ul>
              <ul className="socials">
                <li>
                  <Link>
                    <span>
                      <IoLogoInstagram />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span>
                      <FaXTwitter />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <span>
                      <TbBrandLinkedin />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="nav">
          <div className="lcontainer">
            <div className="content">
              <div className="nav-logo">
                <Link className="logo">
                  {isImage ? (
                    <img src={ceshq.logo} alt="Logo" style={{ height: 40 }} />
                  ) : (
                    <h2>{ceshq.logo}</h2>
                  )}
                </Link>
                <ul>
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/use-case"}>Use case</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/about"}>Who we are</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/blog"}>Blog</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/contact"}>Contact</NavLink>
                  </li>
                </ul>
              </div>
              <div className="action">
                <Link to={"/auth/login"}>Get Started</Link>
               
              </div>
            </div>
          </div>
        </div>
        <div className="menu-nav">
          <div className="lcontainer">
            <div className="content">
              <div className="menu">
                <button>
                  <IoMenu />
                </button>
              </div>
              <Link to={"/"} className="logo">
                {isImage ? (
                  <img
                    src={ceshq.whiteLogo}
                    alt="Logo"
                    style={{ height: 40 }}
                  />
                ) : (
                  <h2>{ceshq.logo}</h2>
                )}
              </Link>
              <div className="action">
                <Link to={"/auth/login"}>Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LHeader;
