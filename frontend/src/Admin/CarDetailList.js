import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarDetailList.css'; // Ensure this imports the updated CSS
import Sidebar from './Sidebar'; // Import the Sidebar component

const CarDetailList = ({ onEdit, onDelete }) => {
    const [carDetails, setCarDetails] = useState([]);

    useEffect(() => {
        fetchCarDetails();
    }, []);

    const fetchCarDetails = async () => {
        try {
            const response = await axios.get('https://localhost:7009/api/CarDetail');
            setCarDetails(response.data);
        } catch (error) {
            console.error("There was an error fetching the car details!", error);
        }
    };

    return (
        <div className="car-detail-container">
            <Sidebar /> {/* Add the Sidebar component here */}
            <div className="car-detail-list">
                <h2 className="car-detail-heading">Car Details</h2>
                <table className="car-detail-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Type</th>
                            <th>Capacity</th>
                            <th>Per Day</th>
                            <th>Is Popular</th>
                            <th>Is Recommended</th>
                            <th>Travel Type</th>
                            <th>Vehicle Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carDetails.map(carDetail => (
                            <tr key={carDetail.id}>
                                <td>{carDetail.id}</td>
                                <td>{carDetail.name}</td>
                                <td>{carDetail.manufacturer}</td>
                                <td>{carDetail.type}</td>
                                <td>{carDetail.capacity}</td>
                                <td>{carDetail.perDay}</td>
                                <td>{carDetail.isPopular ? 'Yes' : 'No'}</td>
                                <td>{carDetail.isRecommended ? 'Yes' : 'No'}</td>
                                <td>
                                    {Array.isArray(carDetail.travelType)
                                        ? carDetail.travelType.join(', ')
                                        : carDetail.travelType}
                                </td>
                                <td>
                                    {Array.isArray(carDetail.vehicleType)
                                        ? carDetail.vehicleType.join(', ')
                                        : carDetail.vehicleType}
                                </td>
                                <td>
                                    <button className="car-detail-table-button" onClick={() => onEdit(carDetail)}>Edit</button>
                                    <button className="car-detail-table-button car-detail-table-button-delete" onClick={() => onDelete(carDetail.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CarDetailList;
