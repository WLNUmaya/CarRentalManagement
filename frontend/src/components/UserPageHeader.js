import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaCog, FaUserCircle } from 'react-icons/fa';
import logoImage from '../assets/IMG2.png';
import './UserPageHeader.css';
import axios from 'axios';

const UserPageHeader = () => {
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsSettingsDropdownOpen(false);
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
    setIsNotificationDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('https://localhost:7009/api/Notifications');
      setNotifications(response.data);
      setNotificationCount(response.data.length);
    } catch (error) {
      console.error("There was an error fetching notifications!", error);
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleNotificationClose = () => {
    setSelectedNotification(null);
  };

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`https://localhost:7009/api/Notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
      setNotificationCount(notificationCount - 1);
    } catch (error) {
      console.error("There was an error deleting the notification!", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <header className="header">
      <img src={logoImage} alt="Logo" className="logo" />
      <nav className="nav-container">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About Us</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="icon-container">
        <div className="icon" onClick={toggleNotificationDropdown}>
          <FaBell />
          {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
          {isNotificationDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                {notifications.map(notification => (
                  <li key={notification.id} className="dropdown-item">
                    <span onClick={() => handleNotificationClick(notification)}>{notification.message}</span>
                    <button onClick={() => handleDeleteNotification(notification.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="icon" onClick={toggleSettingsDropdown}>
          <FaCog />
          {isSettingsDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link to="/appointment-history" className="dropdown-item">Appointment History</Link>
                </li>
                <li>
                  <Link to="/edit-profile" className="dropdown-item">Edit Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <Link to="/user-profile" className="icon"><FaUserCircle /></Link>
      </div>
      
      {selectedNotification && (
        <div className="notification-popup">
          <div className="notification-popup-content">
            <p>{selectedNotification.message}</p>
            <button onClick={handleNotificationClose}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default UserPageHeader;
