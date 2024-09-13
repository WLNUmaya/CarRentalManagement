// src/components/Gallery.js
import React from 'react';

const Gallery = ({ car }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ fontSize: '2rem', textAlign: 'center' }}>Gallery</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {car.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Car ${index}`}
            style={{ width: '200px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
