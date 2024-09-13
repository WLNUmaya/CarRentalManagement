import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({
    email: localStorage.getItem('email') || '',  // Get email from localStorage
    name: '',
    profilePhoto: ''
  });
  const [newName, setNewName] = useState('');
  const [newProfilePhoto, setNewProfilePhoto] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user details from your API
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://localhost:7009/api/UserProfile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(prevUser => ({
            ...prevUser,
            name: data.name,
            profilePhoto: data.profilePhoto
          }));
          setNewName(data.name);
          setNewProfilePhoto(data.profilePhoto);
        } else {
         // Handle error if the user data fetch fails
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
       // Handle error if the user data fetch fails
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    // Save the updated profile information
    try {
      const response = await fetch('https://localhost:7009/api/UserProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: newName,
          profilePhoto: newProfilePhoto
        })
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Error updating profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Email:</label>
          <input type="email" value={user.email} disabled />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Profile Photo URL:</label>
          <input
            type="text"
            value={newProfilePhoto}
            onChange={(e) => setNewProfilePhoto(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfile;
