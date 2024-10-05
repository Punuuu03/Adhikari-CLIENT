/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaVideo } from 'react-icons/fa';
import bubble from '../../assets/bubble.png';
import businessLogo from '../../assets/buss.png'; 

const Sidebar = ({ onNavigate, activePath, setActivePath }) => {
  return (
    <div className="w-1/6 bg-white shadow-lg p-4">
      <div className="flex items-center mb-4">
        <img
          src="https://content.jdmagicbox.com/v2/comp/kolkata/b1/033pxx33.xx33.231201170458.u4b1/catalogue/bharatmala-seva-bharati-kolkata-81j6t16kev.jpg"
          alt="Logo"
          className="h-12 w-12 mr-3" // Increased logo size
        />
        <h1 className="text-2xl font-bold text-purple-800">Adhikari Foundation</h1> {/* Increased font size and changed color */}
      </div>
      <nav className="mt-10">
        <ul>
          {[
            { icon: <FaHome />, label: 'Dashboard', path: '/admindashboard' },
            { icon: <FaVideo />, label: 'Video', path: '/videolist' },
            { icon: <FaUser />, label: 'Students', path: '/students' },
            
            { icon: <FaCog />, label: 'Transaction', path: '/transactions' },
            { icon: <FaSignOutAlt />, label: 'Category', path: '/categorylist' },
          ].map((item, index) => (
            <li
              key={index}
              className={`flex items-center p-2 rounded-lg cursor-pointer transition duration-200 ease-in-out mb-4 ${
                activePath === item.path ? 'bg-blue-500 text-white border-l-4 border-blue-600 shadow-lg' : 'shadow-md'
              } hover:bg-blue-500 hover:text-white hover:shadow-xl`} // Darker shadow effects
              onClick={() => {
                setActivePath(item.path);
                onNavigate(item.path);
              }}
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

const AFixSide = ({ children }) => {
  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePath, setActivePath] = useState('/'); // Track the active path
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onNavigate={navigate} activePath={activePath} setActivePath={setActivePath} />
      <div className="flex-1 p-4">
        {/* Top Section: Marquee */}
        <div className="flex items-center justify-between bg-white p-4 shadow-md">
          <img
            src={businessLogo} // Use your business logo here
            alt="Business Logo"
            className="h-12 w-12 mr-3" // Increased logo size
          />
          <marquee scrollamount="10" behavior="scroll" direction="left" className="flex items-center">
            <div className="flex items-center">
              <img 
                src={bubble} // Replace with the actual path to your bubble.png image
                alt="Bubble"
                className="h-10 w-10 mr-2" // Adjust size as needed
              />
              <span className="text-lg font-bold">Welcome to Admin site</span>
            </div>
          </marquee>

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

        {/* Dashboard Content */}
        {children} {/* Render the child component here */}
      </div>
    </div>
  );
};

export default AFixSide;
