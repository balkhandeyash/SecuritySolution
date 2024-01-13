// Profile.js
import React, { useState } from "react";
import "./Profile.css";
import defaultuserimage from "./defaultuserimage.jpg";

const Profile = () => {
  const [user, setUser] = useState({
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe",
    profileImage: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    username: user.username,
    email: user.email,
    name: user.name,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUser((prevUser) => ({ ...prevUser, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditField = (field) => {
    setIsEditing(true);
    setEditedValues({ ...editedValues, [field]: user[field] });
  };

  const handleFieldValueChange = (field, value) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleSaveChanges = () => {
    setUser((prevUser) => ({
      ...prevUser,
      username: editedValues.username,
      email: editedValues.email,
      name: editedValues.name,
    }));
    setIsEditing(false);
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-photo">
          <img src={user.profileImage || defaultuserimage} alt="Profile" />
          <label htmlFor="image-upload" className="edit-photo-button">
            Edit
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div className="profile-details">
        <div className="field">
          <label>Username:</label>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedValues.username}
                onChange={(e) =>
                  handleFieldValueChange("username", e.target.value)
                }
              />
              <button onClick={() => handleSaveChanges()}>Save</button>
            </>
          ) : (
            <>
              <span>{user.username}</span>
              <button onClick={() => handleEditField("username")}>Edit</button>
            </>
          )}
        </div>
        <div className="field">
          <label>Email:</label>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedValues.email}
                onChange={(e) =>
                  handleFieldValueChange("email", e.target.value)
                }
              />
              <button onClick={() => handleSaveChanges()}>Save</button>
            </>
          ) : (
            <>
              <span>{user.email}</span>
              <button onClick={() => handleEditField("email")}>Edit</button>
            </>
          )}
        </div>
        <div className="field">
          <label>Name:</label>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedValues.name}
                onChange={(e) => handleFieldValueChange("name", e.target.value)}
              />
              <button onClick={() => handleSaveChanges()}>Save</button>
            </>
          ) : (
            <>
              <span>{user.name}</span>
              <button onClick={() => handleEditField("name")}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
