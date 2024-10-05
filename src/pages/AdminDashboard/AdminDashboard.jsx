/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaVideo, FaCalendarAlt } from 'react-icons/fa';
import ADashboard from '../ADashboard/ADashboard';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './AdminDashboard.css'; // Custom styles

const Sidebar = ({ onNavigate }) => {
  const [activePath, setActivePath] = useState('/'); // Track the active path

  const handleNavigation = (path) => {
    setActivePath(path); // Set active path on navigation
    onNavigate(path);
  };

  return (
    <div className="w-1/6 bg-[#83d5df] shadow-lg p-4">
      <div className="flex items-center mb-4">
        <img
          src="https://content.jdmagicbox.com/v2/comp/kolkata/b1/033pxx33.xx33.231201170458.u4b1/catalogue/bharatmala-seva-bharati-kolkata-81j6t16kev.jpg"
          alt="Logo"
          className="h-12 w-12 mr-3" // Increased logo size
        />
        <h1 className="text-2xl font-bold text-white-800">Adhikari Foundation</h1> {/* Increased font size and changed color */}
      </div>
      <nav className="mt-10">
        <ul>
          {[
            { icon: <FaHome />, label: 'Dashboard', path: '/' },
            { icon: <FaVideo />, label: 'Video', path: '/videolist' },
            { icon: <FaUser />, label: 'Students', path: '/students' },
            { icon: <FaCog />, label: 'Transaction', path: '/transactions' },
            { icon: <FaSignOutAlt />, label: 'Category', path: '/categorylist' },
          ].map((item, index) => (
            <li
              key={index}
              className={`flex items-center p-2 rounded-lg cursor-pointer transition duration-200 ease-in-out mb-4 ${
                activePath === item.path ? 'bg-white text-black border-l-4 border-blue-600' : ''
              } hover:bg-white hover:text-black`} // Active effect with blue color and hover effect
              onClick={() => handleNavigation(item.path)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const AdminDashboard = () => {
  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const email = localStorage.getItem('userEmail');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  const handleDateChange = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // Automatically set the end date one month later
    setDateRange([startDate, endDate]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onNavigate={navigate} />
      <div className="flex-1 p-4">
        {/* Top Section: Calendar */}
        <div className="flex items-center justify-between bg-[#83d5df] p-4 shadow-md">
          {/* Admin Dashboard Text */}
          <span className="text-lg font-bold mr-2">Admin Dashboard</span> {/* Reduced margin-right to 2 */}

          <div className="flex items-center w-full max-w-md mx-auto relative ml-7">
            <div className="date-range-picker flex items-center">
              <span>{`${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`}</span>
              <FaCalendarAlt
                className="ml-2 cursor-pointer text-blue-500"
                onClick={() => setCalendarOpen(!calendarOpen)}
              />
            </div>
          </div>

          <div className="relative">
            <img
              src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                <div className="p-4 border-b">
                  {userEmail ? (
                    <p className="text-lg mb-4"><strong>{userEmail}</strong></p>
                  ) : (
                    <p className="text-lg mb-4">No user logged in.</p>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Calendar Popup */}
        {calendarOpen && (
          <div className="calendar-popup absolute top-20 left-10 z-50 bg-white shadow-lg p-4 rounded-lg">
            <Calendar
              onChange={handleDateChange}
              value={dateRange[0]} // Select the start date
            />
          </div>
        )}

        {/* Dashboard Content */}
        <ADashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
