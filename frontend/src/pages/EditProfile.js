// src/components/EditProfile.js
import React, { useState } from 'react';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    // Add more fields as necessary
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated profile information to the server
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
