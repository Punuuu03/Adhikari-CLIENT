/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import CourseGallery from '../CourseGallery/CourseGallery';
// import It from '../CourseGallery/It';
// import StudentDashboard from '../StudentDashboard/StudentDashboard';
import bubble from '../../assets/bubble.png';
import businessLogo from '../../assets/buss.png'; 


const SFixSide = ({children}) => {
  const [user, setUser] = useState({}); // State to hold user data
  const [userEmail, setUserEmail] = useState(''); // State to hold user email
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem('user');
    const email = localStorage.getItem('userEmail');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Parse the stored string back into an object
      setUser(parsedUser);
    }
    
    if (email) {
      setUserEmail(email); // Set the user email from local storage
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      
      <div className="w-1/6 bg-white shadow-lg p-4 rounded-lg"> {/* Added shadow and rounded corners */}
      
        <div className="flex items-center mb-4">
          <img src="https://content.jdmagicbox.com/v2/comp/kolkata/b1/033pxx33.xx33.231201170458.u4b1/catalogue/bharatmala-seva-bharati-kolkata-81j6t16kev.jpg" alt="Logo" className="h-10 w-10 mr-3" />
          <h1 className="text-xl font-bold text-purple-700">Student Dashboard</h1>
        </div>
        <div className="flex flex-col space-y-2">
          <a href="/profile" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">Home</a>
          <a href="/my-learning" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">My Learning</a>
          <a href="/completed" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">Completed</a>
          <a href="/upscgallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">UPSC</a>
          <a href="/mpscgallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">MPSC</a>
          <a href="/freegallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">Free</a>
          <a href="/bankgallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">Banking</a>
          {/* <a href="/sscgallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">SSC</a> */}
          {/* <a href="/hsc" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">HSC</a> */}
        </div>
      </div>

      {children}
    </div>
  );
};

export default SFixSide;
