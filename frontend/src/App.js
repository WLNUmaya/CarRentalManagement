import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import SignIn from './components/Signin';
import Header from './components/Header';
import NewPage from './pages/Userpage';
import DetailPage from './pages/DetailPage'; // Renamed import
import AdminDashboard from './Admin/AdminDashboard'; // Import Admin Dashboard
import SettingsPage from './pages/SettingsPage';
import AppointmentHistory from './pages/AppointmentHistory';
import EditProfile from './pages/EditProfile';
import UserProfile from './pages/UserProfile'; // Import UserProfile component
import CarDetailList from './Admin/CarDetailList'; // Import CarDetailList
import BookingList from './Admin/BookingList'; // Assuming you have this component


function App() {
  return (
    <Router>
      <ConditionalHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/newpage" element={<NewPage />} />
        <Route path="/detail-page" element={<DetailPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/car-details" element={<CarDetailList />} />
        <Route path="/admin/bookings" element={<BookingList />} />
        
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/appointment-history" element={<AppointmentHistory />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/user-profile" element={<UserProfile />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

// Component to conditionally render Header
const ConditionalHeader = () => {
  const location = useLocation();

  // Render Header only for the Home page
  return location.pathname === '/' ? <Header /> : null;
};

export default App;
