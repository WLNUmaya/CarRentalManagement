import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './BookingList.css'; // Import the CSS file

const BookingList = () => {
    const [pendingBookings, setPendingBookings] = useState([]);

    useEffect(() => {
        fetchPendingBookings();
    }, []);

    const fetchPendingBookings = async () => {
        try {
            const response = await axios.get('https://localhost:7009/api/Bookings');
            setPendingBookings(response.data.filter(b => b.status === 'Pending' || b.status === 'Approved' || b.status === 'Rejected'));
        } catch (error) {
            console.error("There was an error fetching the bookings!", error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.post(`https://localhost:7009/api/Bookings/approve/${id}`);
            setPendingBookings(pendingBookings.map(b => b.id === id ? { ...b, status: 'Approved' } : b));
        } catch (error) {
            console.error('Error approving booking:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`https://localhost:7009/api/Bookings/reject/${id}`);
            setPendingBookings(pendingBookings.map(b => b.id === id ? { ...b, status: 'Rejected' } : b));
        } catch (error) {
            console.error('Error rejecting booking:', error);
        }
    };

    

    return (
        <div className="booking-list-container">
            <Sidebar />
            <div className="pending-booking-list">
                <h2 className="pending-bookings-heading">Pending Bookings</h2>
                <table className="pending-bookings-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Car Name</th>
                            <th>Pickup Date</th>
                            <th>Dropoff Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingBookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.name}</td>
                                <td>{booking.carName}</td>
                                <td>{new Date(booking.pickupDate).toLocaleDateString()}</td>
                                <td>{new Date(booking.dropoffDate).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status ${booking.status.toLowerCase()}`}>
                                        {booking.status === 'Approved' ? 'Booked' : booking.status === 'Rejected' ? 'Not Pending' : 'Pending'}
                                    </span>
                                </td>
                                <td>
                                    {booking.status === 'Pending' && (
                                        <>
                                            <button className="pending-booking-table-button" onClick={() => handleApprove(booking.id)}>Approve</button>
                                            <button className="pending-booking-table-button pending-booking-table-button-reject" onClick={() => handleReject(booking.id)}>Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingList;
