import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPageHeader from '../components/UserPageHeader';
import './AppointmentHistoryPage.css'; // Import the CSS file

const AppointmentHistoryPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [expandedAppointmentId, setExpandedAppointmentId] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7009/api/Bookings')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the appointment data!", error);
      });
  }, []);

  const handleToggleDetails = (appointmentId) => {
    setExpandedAppointmentId(prevId => prevId === appointmentId ? null : appointmentId);
  };

  return (
    <div className="appointment-history-page">
      <UserPageHeader />
      <div className="appointment-history-container">
        <h2 className="appointment-history-title">Appointment History</h2>
        {appointments.length === 0 ? (
          <p className="no-appointments-text">No appointment history available.</p>
        ) : (
          appointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-summary" onClick={() => handleToggleDetails(appointment.id)}>
                <div className="appointment-details">
                  <p><strong>Car:</strong> {appointment.carName} ({appointment.carType})</p>
                  <p><strong>Date:</strong> {new Date(appointment.pickupDate).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {appointment.pickupLocation}</p>
                </div>
                <div className="toggle-details">
                  {expandedAppointmentId === appointment.id ? 'Hide Details' : 'View Details'}
                </div>
              </div>
              {expandedAppointmentId === appointment.id && (
                <div className="appointment-expanded-details">
                  <p><strong>Return Date:</strong> {new Date(appointment.dropoffDate).toLocaleDateString()}</p>
                  <p><strong>Vehicle Type:</strong> {appointment.carType}</p>
                  <p><strong>Capacity:</strong> {appointment.carCapacity}</p>
                  <p><strong>Rental Rate:</strong> {appointment.carPerDay} per day</p>
                  <p><strong>Name:</strong> {appointment.name}</p>
                  <p><strong>Phone Number:</strong> {appointment.phoneNumber}</p>
                  <p><strong>Address:</strong> {appointment.address}</p>
                  <p><strong>Town/City:</strong> {appointment.townCity}</p>
                  <p><strong>Pickup Time:</strong> {appointment.pickupTime}</p>
                  <p><strong>Dropoff Time:</strong> {appointment.dropoffTime}</p>
                  <p><strong>Dropoff Location:</strong> {appointment.dropoffLocation}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentHistoryPage;
