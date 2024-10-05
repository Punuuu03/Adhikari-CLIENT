/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // Import icons
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://adhikari-server.vercel.app/api/categories');
        setCategories(response.data);
        setFilteredCategories(response.data); // Initialize filteredCategories with all categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter categories based on the search term
    if (searchTerm) {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories); // Reset to original categories if search term is empty
    }
  }, [searchTerm, categories]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`https://adhikari-server.vercel.app/api/categories/${id}`);
        setCategories(categories.filter((category) => category._id !== id));
        setFilteredCategories(filteredCategories.filter((category) => category._id !== id));
      } catch (error) {
        console.error('Error deleting category:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/editcategory/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search category..."
            className="border border-gray-300 rounded-lg py-2 px-4 pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
        <button 
          onClick={() => navigate('/addcategory')}
          className="bg-gradient-to-r from-blue-500 to-purple-800 text-white py-2 px-4 rounded hover:bg-gradient-to-l transition"
        >
          Add Category
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
        <thead className="bg-blue-600">
          <tr>
            <th className="py-2 px-4 text-left text-white w-1/12">#</th>
            <th className="py-2 px-4 text-left text-white w-1/6">Category Name</th>
            <th className="py-2 px-4 text-left text-white w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category, index) => (
            <tr 
              key={category._id} 
              className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <td className="py-4 px-4 w-1/12">{index + 1}</td>
              <td className="py-4 px-4 w-1/6">{category.name}</td>
              <td className="py-4 px-4 w-1/6 flex items-center">
                <button 
                  onClick={() => handleEdit(category._id)} 
                  className="text-blue-500 hover:underline mr-4 flex items-center"
                >
                  <FaEdit size={20} className="mr-1" />
                </button>
                <button 
                  onClick={() => handleDelete(category._id)} 
                  className="text-red-500 hover:underline flex items-center"
                >
                  <FaTrash size={20} className="mr-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
