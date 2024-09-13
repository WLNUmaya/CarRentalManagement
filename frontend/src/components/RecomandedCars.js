import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import carImages from '../Data/carImages';
import { FaCogs, FaUsers } from 'react-icons/fa';
import './PopularCars.css';

const RecomandedCars = ({ data, setAllCars }) => {
    const { id, name, img, manufacturer, type, capacity, perDay, vehicleType, isBooked } = data;
    const navigate = useNavigate();
    const boxRef = useRef(null);

    // Function to book the car
    const bookCar = async (carId) => {
        try {
            await axios.put(`https://localhost:7009/api/CarDetail/update-booking-status/${carId}`, { isBooked: true });
            setAllCars(prevCars => prevCars.map(car => car.id === carId ? { ...car, isBooked: true } : car));
        } catch (error) {
            console.error("There was an error updating the booking status!", error);
        }
    };

    const handleRentNowClick = () => {
        console.log('Selected Car Details:', data);
        bookCar(id);
        navigate('/detail-page', { state: { selectedCar: data } });
    };

    const formattedPerDay = `Rs. ${perDay}.00/day`;

    const carImage = carImages.find(car => car.id === id)?.image1;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (boxRef.current) {
            observer.observe(boxRef.current);
        }

        return () => {
            if (boxRef.current) {
                observer.unobserve(boxRef.current);
            }
        };
    }, []);

    return (
        <div className={`vehicle-box ${isBooked ? 'booked' : ''}`} ref={boxRef}>
            <div className="vehicle-info">
                <h3>{name}</h3>
                <p>{typeof vehicleType === 'string' ? vehicleType : vehicleType.join(', ')}</p>
                <p>Status: {isBooked ? 'Booked' : 'Available'}</p>
            </div>
            <img src={carImage} alt={name} className="vehicle-image" />
            <div className="vehicle-details">
                <p className="transmission-type"><FaCogs /> {type}</p>
                <p className="capacity"><FaUsers /> {capacity} people</p>
            </div>
            <div className="rent-button-container">
                <p dangerouslySetInnerHTML={{ __html: `<span class="price">${formattedPerDay}</span>` }} />
                <button className="rent-button" onClick={handleRentNowClick} disabled={isBooked}>
                    Rent Now
                </button>
            </div>
        </div>
    );
};

export default RecomandedCars;
