import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Menu</h2>
            <ul>
                <li><NavLink to="/admin/dashboard" activeClassName="active">Dashboard</NavLink></li>
                <li><NavLink to="/admin/car-details" activeClassName="active">Car Details</NavLink></li>
                <li><NavLink to="/admin/bookings" activeClassName="active">Bookings</NavLink></li>
                <li><NavLink to="/admin/users" activeClassName="active">Users</NavLink></li>
                <li><NavLink to="/admin/settings" activeClassName="active">Settings</NavLink></li>
            </ul>
        </div>
    );
};

export default Sidebar;
