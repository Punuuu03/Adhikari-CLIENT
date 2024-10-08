/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import CourseGallery from '../CourseGallery/CourseGallery';
// import It from '../CourseGallery/It';
import StudentDashboard from '../StudentDashboard/StudentDashboard';
import bubble from '../../assets/bubble.png';
import businessLogo from '../../assets/buss.png'; 


const Profile = () => {
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
          <a href="/mylearning" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">My Learning</a>
          <a href="/completed" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">Completed</a>
          <a href="/upscgallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">UPSC</a>
          <a href="/mpscgallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">MPSC</a>
          <a href="/freegallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">Free</a>
          <a href="/bankgallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">Banking</a>
          {/* <a href="/sscgallery" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">SSC</a> */}
          {/* <a href="/hsc" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 shadow-md p-4 rounded-md hover:shadow-lg">HSC</a> */}
        </div>
      </div>

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
              <span className="text-lg font-bold">Welcome to Student site</span>
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
        <StudentDashboard/>
</div>
    </div>
  );
};

export default Profile;
