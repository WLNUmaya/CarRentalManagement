import React, { useState, useEffect } from 'react';
import NewPageHeader from '../components/UserPageHeader';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PopularCars from '../components/PopularCars';
import RecomandedCars from '../components/RecomandedCars';
import './UserPage.css';
import axios from 'axios';
import backgroundImg from '../assets/IMG12.png';

const UserPage = () => {
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    pickupLocation: '',
    pickupDate: null,
    pickupTime: null,
    returnDate: null,
    vehicleType: '',
    travelType: '',
    manufacturer: '',
    capacity: ''
  });
  const [allCars, setAllCars] = useState([]);
  const [popularCars, setPopularCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    manufacturers: [],
    capacities: [],
    travelTypes: [],
    vehicleTypes: []
  });
  const [showAllPopularCars, setShowAllPopularCars] = useState(false);
  const [showAllRecommendedCars, setShowAllRecommendedCars] = useState(false);
  const [showAllSuitableCars, setShowAllSuitableCars] = useState(false);
  const [showFilteredCars, setShowFilteredCars] = useState(false);

  useEffect(() => {
    axios.get('https://localhost:7009/api/CarDetail')
      .then(response => {
        setAllCars(response.data);
        extractFilterOptions(response.data);
        setPopularCars(response.data.filter(car => car.isPopular));
        setRecommendedCars(response.data.filter(car => car.isRecommended));
      })
      .catch(error => {
        console.error("There was an error fetching the car data!", error);
      });
  }, []);
  

  const extractFilterOptions = (cars) => {
    const manufacturers = [...new Set(cars.map(car => car.manufacturer))];
    const capacities = [...new Set(cars.map(car => car.capacity))];
    const travelTypes = [...new Set(cars.map(car => car.travelType).flat())];
    const vehicleTypes = [...new Set(cars.map(car => car.vehicleType).flat())];

    setFilterOptions({
      manufacturers,
      capacities,
      travelTypes,
      vehicleTypes
    });
  };

  const handleDropdownToggle = (dropdownId) => {
    setVisibleDropdown(prev => (prev === dropdownId ? null : dropdownId));
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setVisibleDropdown(null);
  };

  const handleSubmit = () => {
    const filtered = allCars.filter(car => {
      const isVehicleTypeMatch = selectedFilters.vehicleType ? car.vehicleType.includes(selectedFilters.vehicleType) : true;
      const isManufacturerMatch = selectedFilters.manufacturer ? car.manufacturer === selectedFilters.manufacturer : true;
      const isCapacityMatch = selectedFilters.capacity ? car.capacity === selectedFilters.capacity : true;
      const isTravelTypeMatch = selectedFilters.travelType ? car.travelType.includes(selectedFilters.travelType) : true;

      return isVehicleTypeMatch && isManufacturerMatch && isCapacityMatch && isTravelTypeMatch;
    });

    setFilteredCars(filtered);
    setShowFilteredCars(true);
  };

  const handleShowAllPopularCars = () => {
    setShowAllPopularCars(prev => !prev);
  };

  const handleShowAllRecommendedCars = () => {
    setShowAllRecommendedCars(prev => !prev);
  };

  const handleShowAllSuitableCars = () => {
    setShowAllSuitableCars(prev => !prev);
  };

  return (
    <div className="page">
      <NewPageHeader />
      <div className="oval-bar">
        {/* Vehicle Types Dropdown */}
        <div className="dropdown-container vehicle-type">
          <div 
            className="dropdown-button"
            onClick={() => handleDropdownToggle(6)}
          >
            {selectedFilters.vehicleType || 'Vehicle Type'} {visibleDropdown === 6 ? <FaChevronUp className="icon up" /> : <FaChevronDown className="icon down" />}
          </div>
          <div className={visibleDropdown === 6 ? 'dropdown dropdown-visible' : 'dropdown'}>
            {filterOptions.vehicleTypes.map((type, index) => (
              <div key={index} className="dropdown-item" onClick={() => handleFilterChange('vehicleType', type)}>{type}</div>
            ))}
          </div>
        </div>

        {/* Manufacturer Dropdown */}
        <div className="dropdown-container">
          <div 
            className="dropdown-button"
            onClick={() => handleDropdownToggle(7)}
          >
            {selectedFilters.manufacturer || 'Vehicle Manufacturer'} {visibleDropdown === 7 ? <FaChevronUp style={{ marginLeft: '5px' }} /> : <FaChevronDown style={{ marginLeft: '5px' }} />}
          </div>
          <div className={visibleDropdown === 7 ? 'dropdown dropdown-visible' : 'dropdown'}>
            {filterOptions.manufacturers.map((manufacturer, index) => (
              <div key={index} className="dropdown-item" onClick={() => handleFilterChange('manufacturer', manufacturer)}>{manufacturer}</div>
            ))}
          </div>
        </div>

        {/* Capacity Dropdown */}
        <div className="dropdown-container">
          <div 
            className="dropdown-button"
            onClick={() => handleDropdownToggle(8)}
          >
            {selectedFilters.capacity || 'Vehicle Capacity'} {visibleDropdown === 8 ? <FaChevronUp style={{ marginLeft: '5px' }} /> : <FaChevronDown style={{ marginLeft: '5px' }} />}
          </div>
          <div className={visibleDropdown === 8 ? 'dropdown dropdown-visible' : 'dropdown'}>
            {filterOptions.capacities.map((capacity, index) => (
              <div key={index} className="dropdown-item" onClick={() => handleFilterChange('capacity', capacity)}>{capacity}</div>
            ))}
          </div>
        </div>

        {/* Travel Type Dropdown */}
        <div className="dropdown-container">
          <div 
            className="dropdown-button"
            onClick={() => handleDropdownToggle(9)}
          >
            {selectedFilters.travelType || 'Travel Type'} {visibleDropdown === 9 ? <FaChevronUp style={{ marginLeft: '5px' }} /> : <FaChevronDown style={{ marginLeft: '5px' }} />}
          </div>
          <div className={visibleDropdown === 9 ? 'dropdown dropdown-visible' : 'dropdown'}>
            {filterOptions.travelTypes.map((type, index) => (
              <div key={index} className="dropdown-item" onClick={() => handleFilterChange('travelType', type)}>{type}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="submit-button">
        <button className="button" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="text-image-container">
        <div className="text-content">
          <div className="text">
            <div className="animated-text">The Best Platform for</div>
            <div className="animated-text">Car Rental</div>
          </div>
          <div className="additional-text">
            <div>Ease of doing a car rental safely and reliably. Of course </div>
            <div>at a low price</div>
          </div>
        </div>
        <img className="text-image" src={backgroundImg} alt="Car Rental" />
      </div>

      {!showFilteredCars && (
        <>
          <div className="recommendation-container">
            <div className="text1">Popular Car</div>
            <div className="text2" onClick={handleShowAllPopularCars}>
              {showAllPopularCars ? 'View Less' : 'View All'}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
            {popularCars.slice(0, showAllPopularCars ? popularCars.length : 4).map((car, key) => 
              <PopularCars key={key} data={car} />
            )}
          </div>
        </>
      )}

      {!showFilteredCars && (
        <>
          <div className="recommendation-container">
            <div className="text1">Recommended Car</div>
            <div className="text2" onClick={handleShowAllRecommendedCars}>
              {showAllRecommendedCars ? 'View Less' : 'View All'}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
            {recommendedCars.slice(0, showAllRecommendedCars ? recommendedCars.length : 8).map((car, key) => 
              <RecomandedCars key={key} data={car} />
            )}
          </div>
        </>
      )}

      {showFilteredCars && (
        <>
          <div className="recommendation-container">
            <div className="text1">Most Suitable Car</div>
            <div className="text2" onClick={handleShowAllSuitableCars}>
              {showAllSuitableCars ? 'View Less' : 'View All'}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
            {filteredCars.slice(0, showAllSuitableCars ? filteredCars.length : 8).map((car, key) => 
              <PopularCars key={key} data={car} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
