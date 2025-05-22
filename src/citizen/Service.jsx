import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { assets, services } from "../assets/asset";

import "./../style/landing.scss";

const LandingService = () => {
  const { path } = useParams();

  const normalizeTitle = (title) =>
    title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const service = services.find((item) => normalizeTitle(item.title) === path);

  //   service not found
  if (!service) {
    return (
        <p>Service not found</p>
    );
  }

  return (
    <>
      <div className="landing-service">
        <div
          className="hero"
          style={{
            backgroundColor: "rgb(7, 143, 206)",
            backgroundImage: `url(${assets.images.hero1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "30vh",
            width: "100%",
          }}
        >
          <div className="lcontainer">
            <div className="content">
              <ul>
                <li>
                  <Link>Home</Link>
                </li>
                <li>
                  <Link className="none">Service</Link>
                </li>
                <li>
                  <NavLink to={`/service/${path}`}>{service.title}</NavLink>
                </li>
              </ul>
              <h2>{service.title}</h2>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="lcontainer">
            <div className="content">
              <h3>{service.shortBio}</h3>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: service.description }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingService;
