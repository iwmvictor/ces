import React, { useState } from "react";

const AdminSetting = () => {
  const [image, setImage] = useState(null); // For storing the uploaded image
  const [locationMethod, setLocationMethod] = useState("manual"); // For handling location method

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (PNG, JPG, JPEG).");
    }
  };

  return (
    <div className="admin-settings">
      <div className="container">
        <div className="page__title">
          <h3>Settings</h3>
          <p>Manage your profile and preferences here</p>
        </div>
        <div className="personal__details">
          <form>
            <div className="form__title">
              <div>
                <h4>Personal details</h4>
                <p>Edit your personal information</p>
              </div>
              <div className="profile__pic">
                {image && (
                  <div className="preview">
                    <img src={image} />
                  </div>
                )}
                <span className="upload">Upload</span>
                <input
                  type="file"
                  title=""
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="detail__form">
              <div className="input-box">
                <label>Full Names</label>
                <div className="input">
                  <input type="text" placeholder="e.g Andrew Kamali" />
                </div>
              </div>
              <div className="input-box">
                <label>Email Address</label>
                <div className="input">
                  <input type="email" placeholder="e.g kamali@ces.rw" />
                </div>
              </div>
              <div className="input-box">
                <label>Phone Number</label>
                <div className="input">
                  <input type="text" placeholder="e.g 250781234567" />
                </div>
              </div>

              <div className="input-box">
                <label>Username</label>
                <div className="input">
                  <input type="text" placeholder="e.g kamalian" />
                </div>
              </div>
              <div className="input-box">
                <label>Password</label>
                <div className="input">
                  <input type="password" placeholder="****" />
                </div>
              </div>

              <div className="input-box">
                <button>Save Info</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;
