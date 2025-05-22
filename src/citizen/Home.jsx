import { Link } from "react-router-dom";
import {
  agencies,
  assets,
  citizens,
  complaints,
  posts,
  responders,
  services,
  usecases,
} from "../assets/asset";

import "./../style/landing.scss";

const LandingPage = () => {
  return (
    <>
      <div className="landingpage">
        <div
          className="hero"
          style={{
            backgroundColor: "rgb(7, 143, 206)",
            backgroundImage: `url(${assets.images.hero1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
            width: "100%",
          }}
        >
          <div className="lcontainer">
            <div className="content">
              <div className="welcome">
                Citizen Complaint & Engagement System
              </div>
              <h2>
                Empowering Rwandans to report issues, raise voices, and drive
                change.
              </h2>
              <p>
                Join thousands of citizens in building a safer, cleaner, and
                more accountable Rwanda—one complaint at a time.
              </p>
              <Link to="/complaints/new" className="cta-button">
                Report an Issue
              </Link>
            </div>
          </div>
        </div>

        <div className="features">
          <div className="lcontainer">
            <div className="content">
              {services.map((item, index) => {
                const urlTitle = item.title
                  .toLowerCase()
                  .replace(/&/g, "and")
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-");

                return (
                  <div className="box" key={index}>
                    <div className="icon">
                      <item.icon />
                    </div>
                    <div className="txt">
                      <h3>{item.title}</h3>
                      <p>{item.shortBio}</p>
                    </div>
                    <Link to={`/service/${urlTitle}`}>Read more</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="numbers">
          <div className="lcontainer">
            <div className="content">
              <div className="box">
                <div className="conts">
                  <h2>
                    {complaints.length}
                    {complaints.length > 1 ? "+" : ""}
                  </h2>
                  <p>
                    {complaints.length > 1 ? "Complaints are" : "Complaint is"}{" "}
                    solved
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="conts">
                  <h2>
                    {responders.length}
                    {responders.length > 1 ? "+" : ""}
                  </h2>
                  <p>
                    {responders.length > 1 ? "Agencies" : "Agency"} ready to
                    support
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="conts">
                  <h2>
                    {citizens.length}
                    {citizens.length > 1 ? "+" : ""}
                  </h2>
                  <p>
                    {citizens.length > 1 ? "Citizens" : "Citizen"} on our
                    platform
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="conts">
                  <h2>
                    {posts.length}
                    {posts.length > 1 ? "+" : ""}
                  </h2>
                  <p>Shared posts on platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="usecase" id="use-case">
          <div className="lcontainer">
            <div className="content">
              {usecases.map((item, index) => (
                <div className="box" key={index}>
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(${assets.images.bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
