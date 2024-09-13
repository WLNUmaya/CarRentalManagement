import React from 'react';
import { useNavigate } from 'react-router-dom';

const FilterCars = (props) => {
    const { id, name, img, manufacturer, type, capacity, perday } = props.data;
    const navigate = useNavigate();

    const handleRentNowClick = () => {
        console.log('Selected Car Details:', props.data); // Log car data to console
        navigate('/detail-page', { state: { selectedCar: props.data } }); // Pass the car data
    };

    // Define the styles here
    const boxStyle = {
        padding: '20px',
        margin: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        textAlign: 'center',
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
    };

    const rentNowButtonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div style={boxStyle}>
            <h3 style={{ fontSize: '2rem', padding: '1rem', textAlign: 'center', fontWeight: '500' }}>{name}</h3>
            <p style={{ fontSize: '1rem', padding: '0.5rem', textAlign: 'center', fontWeight: '500' }}>{manufacturer}</p>
            <img src={img} alt='' style={imageStyle} />
            <p style={{ fontSize: '1rem', padding: '0.5rem', textAlign: 'center', fontWeight: '500' }}>{type}</p>
            <p style={{ fontSize: '1rem', padding: '0.5rem', textAlign: 'center', fontWeight: '500' }}>{capacity}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>
                    <span style={{ fontSize: '2rem', fontWeight: '500' }}>{perday}</span>
                </p>
                <button style={rentNowButtonStyle} onClick={handleRentNowClick}>
                    Rent Now
                </button>
            </div>
        </div>
    );
};

export default FilterCars;
