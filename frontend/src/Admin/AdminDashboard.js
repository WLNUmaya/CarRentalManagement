import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CarDetailForm from './CarDetail Form'; // Ensure this is the correct path for your component
import Sidebar from './Sidebar'; // Import the Sidebar component
import './AdminDashboard.css'; // Add any necessary styles for the dashboard

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [carDetails, setCarDetails] = useState([]);
    const [currentCarDetail, setCurrentCarDetail] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://localhost:7009/api/Bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        const fetchCarDetails = async () => {
            try {
                const response = await axios.get('https://localhost:7009/api/CarDetail');
                setCarDetails(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchBookings();
        fetchCarDetails();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.post(`https://localhost:7009/api/Bookings/approve/${id}`);
            setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Approved' } : b));
            setSelectedBooking(null); // Clear selected booking after action
        } catch (error) {
            console.error('Error approving booking:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`https://localhost:7009/api/Bookings/reject/${id}`);
            setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Rejected' } : b));
            setSelectedBooking(null); // Clear selected booking after action
        } catch (error) {
            console.error('Error rejecting booking:', error);
        }
    };

    const handleEdit = (carDetail) => {
        setCurrentCarDetail(carDetail);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7009/api/CarDetail/${id}`);
            setCurrentCarDetail(null);  // Reset the form
            // Fetch car details again to update the list
            const response = await axios.get('https://localhost:7009/api/CarDetail');
            setCarDetails(response.data);
        } catch (error) {
            console.error('There was an error deleting the car detail!', error);
        }
    };

    const handleSave = async () => {
        setCurrentCarDetail(null);  // Reset the form
        // Fetch car details again to update the list
        const response = await axios.get('https://localhost:7009/api/CarDetail');
        setCarDetails(response.data);
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content">
                <h1>Admin Dashboard</h1>

                <section>
                    <h2>Pending Bookings</h2>
                    <ul>
                        {bookings.filter(b => b.status === 'Pending').map((booking) => (
                            <li key={booking.id} onClick={() => setSelectedBooking(booking)}>
                                <p>{booking.name} - {booking.carName}</p>
                            </li>
                        ))}
                    </ul>

                    {selectedBooking && (
                        <div>
                            <h3>Selected Booking Details</h3>
                            <p>Name: {selectedBooking.name}</p>
                            <p>Car: {selectedBooking.carName}</p>
                            <p>Status: {selectedBooking.status}</p>
                            <button onClick={() => handleApprove(selectedBooking.id)}>Approve</button>
                            <button onClick={() => handleReject(selectedBooking.id)}>Reject</button>
                        </div>
                    )}
                </section>

                <section>
                    <h2>Manage Car Details</h2>
                    <CarDetailForm currentCarDetail={currentCarDetail} onSave={handleSave} />
                   
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
