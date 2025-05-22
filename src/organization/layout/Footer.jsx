import React from "react";

const OrgFooter = () => {
  return (
    <>
      <div className="agency-footer">
        <div className="container">
          <div className="content">
            <p>&copy; {new Date().getFullYear()} CES. All right reserved. </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgFooter;
