/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';
import image from '../../assets/sign.png'; // Path to the background image
import closeIcon from '../../assets/users.png'; // Ensure this is your close icon path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://adhikari-server.vercel.app/api/auth/login', { email, password }, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      console.log('Login successful:', response.data);

      // Store email in localStorage (optional)
      localStorage.setItem('userEmail', email);

      // Redirect based on email and password
      if (email === 'admin@gmail.com' && password === '1234') {
        // Redirect to Admin Dashboard
        navigate('/admindashboard');
      } else {
        // Redirect to Profile page
        navigate('/profile');
      }
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-200 opacity-50"></div> {/* Background blur effect */}
      <div className="relative z-10 flex shadow-lg rounded-lg w-full max-w-3xl overflow-hidden">
        {/* Left Column: Login Form */}
        <div className="w-1/2 p-8 bg-white">
          <button 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => navigate(-1)} // Navigate back
          >
            <img src='https://cdn-icons-png.flaticon.com/512/11450/11450177.png' alt="Close" className="w-8 h-8" />
          </button>
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login to Your Account</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 hover:shadow-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-transform duration-300 hover:shadow-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Signup here
            </a>
          </p>
        </div>

        {/* Right Column: Background Image */}
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
          {/* Background image on the right side */}
        </div>
      </div>
    </div>
  );
};

export default Login;
