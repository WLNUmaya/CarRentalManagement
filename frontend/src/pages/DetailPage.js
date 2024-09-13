import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserPageHeader from '../components/UserPageHeader';
import axios from 'axios';
import './DetailPage.css'; // Import the CSS file
import carImages from '../Data/carImages';

const DetailPage = () => {
  const location = useLocation();
  const { selectedCar } = location.state || {};

  const [currentForm, setCurrentForm] = useState(1);

  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    townCity: '',
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffLocation: '',
    dropoffDate: '',
    dropoffTime: '',
    CarId: selectedCar?.id || '',
    CarName: selectedCar?.name || '',
    CarManufacturer: selectedCar?.manufacturer || '',
    CarType: selectedCar?.type || '',
    CarCapacity: selectedCar?.capacity || '',
    CarPerDay: selectedCar?.perday || '',
  });

  const handleNext = () => {
    if (currentForm < 3) {
      setCurrentForm(currentForm + 1);
    }
  };

  const handlePrevious = () => {
    if (currentForm > 1) {
      setCurrentForm(currentForm - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://localhost:7009/api/Bookings', { ...bookingDetails, status: 'Pending' }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      alert('Booking request sent. Waiting for admin approval.');
    } catch (error) {
      console.error('Error submitting data:', error.response?.data || error.message);
      alert('Error submitting booking request.');
    }
  };

  // Extract details from selectedCar
  const { id, img, name, manufacturer, type, capacity, vehicleType, formattedPerDay, description, features } = selectedCar || {};

  // Determine the car images to display
  const carImage = carImages.find(car => car.id === id)?.image1;
  const carImage1 = carImages.find(car => car.id === id)?.image2;
  const carImage2 = carImages.find(car => car.id === id)?.image3;
  const carImage3 = carImages.find(car => car.id === id)?.image4;

  return (
    <div className="detail-page-container">
      <UserPageHeader />
      <div className="car-images-container">
        <img src={carImage} alt={name} className="vehicle-image-large" />
        <div className="car-images-thumbnails">
          <img src={carImage1} alt={`${name} thumbnail`} className="vehicle-image-thumbnail" />
          <img src={carImage2} alt={`${name} thumbnail`} className="vehicle-image-thumbnail" />
          <img src={carImage3} alt={`${name} thumbnail`} className="vehicle-image-thumbnail" />
        </div>
      </div>
      <div className="car-details-box">
  <h2 className="car-name">{name}</h2>
  <span className="car-price">{formattedPerDay}</span>
  <p className="car-description">{description}</p>
  <div className="car-features">
    <div className="car-specs">
      <p><strong>Manufacturer:</strong> {manufacturer}</p>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Capacity:</strong> {capacity} people</p>
      <p><strong>Vehicle Type:</strong> {vehicleType}</p>
      <p><strong>Fuel:</strong> Gasoline</p>
    </div>
    <div className="car-extra-features">
     
      <ul>
        {features && features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  </div>
  <div className="car-price-container">
    <span className="car-price">{formattedPerDay}</span>
  </div>
</div>


      <main style={{ flex: 3 }}>
        {/* Billing Info Form */}
        <div className={`detail-page-form-container ${currentForm === 1 ? '' : 'detail-page-hidden'}`}>
          <form className="detail-page-form">
            <div style={{ marginBottom: '20px' }}>
              <div className="detail-page-title">Billing Info</div>
              <div className="detail-page-text">Please enter your bill info</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={bookingDetails.name}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={bookingDetails.phoneNumber}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Address:</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={bookingDetails.address}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Town/City:</label>
                  <input
                    type="text"
                    name="townCity"
                    placeholder="Enter town/city"
                    value={bookingDetails.townCity}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="detail-page-button"
            >
              Next
            </button>
          </form>
        </div>

        {/* Booking Details Form */}
        <div className={`detail-page-form-container ${currentForm === 2 ? '' : 'detail-page-hidden'}`}>
          <form className="detail-page-form">
            <div style={{ marginBottom: '20px' }}>
              <div className="detail-page-title">Booking Details</div>
              <div className="detail-page-text">Please enter your booking details</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Pickup Location:</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    placeholder="Enter pickup location"
                    value={bookingDetails.pickupLocation}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Pickup Date:</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={bookingDetails.pickupDate}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Pickup Time:</label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={bookingDetails.pickupTime}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Dropoff Location:</label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    placeholder="Enter dropoff location"
                    value={bookingDetails.dropoffLocation}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Dropoff Date:</label>
                  <input
                    type="date"
                    name="dropoffDate"
                    value={bookingDetails.dropoffDate}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="detail-page-label">Dropoff Time:</label>
                  <input
                    type="time"
                    name="dropoffTime"
                    value={bookingDetails.dropoffTime}
                    onChange={handleInputChange}
                    className="detail-page-input"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrevious}
              className="detail-page-button"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="detail-page-button"
            >
              Next
            </button>
          </form>
        </div>

        {/* Summary Form */}
        <div className={`detail-page-form-container ${currentForm === 3 ? '' : 'detail-page-hidden'}`}>
          <div className="detail-page-summary">
            <h3>Summary</h3>
            <p><strong>Car:</strong> {bookingDetails.CarName}</p>
            <p><strong>Pickup Location:</strong> {bookingDetails.pickupLocation}</p>
            <p><strong>Pickup Date:</strong> {bookingDetails.pickupDate}</p>
            <p><strong>Pickup Time:</strong> {bookingDetails.pickupTime}</p>
            <p><strong>Dropoff Location:</strong> {bookingDetails.dropoffLocation}</p>
            <p><strong>Dropoff Date:</strong> {bookingDetails.dropoffDate}</p>
            <p><strong>Dropoff Time:</strong> {bookingDetails.dropoffTime}</p>
            <button
              type="button"
              onClick={handleSubmit}
              className="detail-page-button"
            >
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={handlePrevious}
              className="detail-page-button"
              style={{ marginLeft: '10px' }}
            >
              Previous
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;