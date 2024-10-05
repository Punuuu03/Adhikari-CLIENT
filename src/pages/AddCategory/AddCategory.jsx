/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTag } from 'react-icons/fa'; // Import the FaTag icon for category

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = { name: categoryName };

    try {
      await fetch('https://adhikari-server.vercel.app/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      navigate('/categorylist'); // Redirect to the category list
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleClose = () => {
    navigate('/categorylist');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="relative max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-2xl border border-gray-300">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 transition duration-200 text-4xl p-1"
        >
          &times; {/* Close button */}
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Add Category</h2>

          {/* Category Name Input */}
          <div className="mb-6">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaTag className="text-blue-600 p-2 text-3xl font-bold" /> {/* Icon for category */}
              <input
                type="text"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-800 text-white py-2 rounded hover:bg-gradient-to-l transition duration-200"
          >
            <strong>Add Category</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
