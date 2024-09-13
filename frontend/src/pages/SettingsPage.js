// src/pages/SettingsPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <ul>
        <li>
          <Link to="/appointment-history">Appointment History</Link>
        </li>
        <li>
          <Link to="/edit-profile">Edit Profile</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );

  function handleLogout() {
    // Implement your logout logic here
    // For example, clearing user session data, tokens, etc.
    alert("Logged out successfully!");
  }
};

export default SettingsPage;
