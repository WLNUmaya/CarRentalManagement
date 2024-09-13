import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed
import logoImage from '../assets/IMG2.png';
import mobileLogoImage from '../assets/IMG2.png';
import '../components/Header.css'


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-transparent fixed top-0 left-0 right-0 flex items-center p-4 z-50">
      {/* Desktop Logo Container */}
      <div className="hidden md:flex flex-shrink-0 -mt-3 ml-5">
        <img src={logoImage} alt="Logo" className="w-32" />
      </div>

      {/* Mobile Logo Container */}
      <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 -mt-1">
        <img src={mobileLogoImage} alt="Mobile Logo" className="w-32" />
      </div>

      {/* Navigation Container */}
      <div className="flex-grow flex justify-end md:justify-center relative -mt-3">
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } absolute right-0 top-1/2 transform -translate-y-1/2 md:relative md:flex md:justify-center md:items-center space-x-8 bg-gray-800 bg-opacity-90 md:bg-transparent p-4 md:p-0 z-50 -ml-20`}
        >
          {/* Navigation Links */}
          <Link to="/" style={{ color: '#0489A6' }} className="font-bold text-m hover:text-gray-300">Home</Link>
          <Link to="/about" style={{ color: '#0489A6' }} className="font-bold text-m hover:text-gray-300">About Us</Link>
          <Link to="/contact" style={{ color: '#0489A6' }} className="font-bold text-m hover:text-gray-300">Contact</Link>
          <Link to="/login" style={{ color: '#0489A6' }} className="font-bold text-m hover:text-gray-300">Log in</Link>
          <Link to="/signin" style={{ color: '#0489A6' }} className="font-bold text-m hover:text-gray-300">Sign in</Link>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center text-white hover:text-gray-300 ml-auto"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}
