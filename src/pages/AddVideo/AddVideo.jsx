/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaVideo, FaFileUpload, FaEdit, FaTag, FaDollarSign } from 'react-icons/fa'; // Import icons

const AddVideo = () => {
  const [videoName, setVideoName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://adhikari-server.vercel.app/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleVideoUpload = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', 'h5ahb6iv');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dednblbo3/video/upload', formData);
      const uploadedVideoUrl = res.data.secure_url;
      setVideoUrl(uploadedVideoUrl);
      console.log('Video URL:', uploadedVideoUrl);
      return uploadedVideoUrl;
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Video upload failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedVideoUrl = await handleVideoUpload();

    if (uploadedVideoUrl) {
      const videoData = {
        name: videoName,
        videoUrl: uploadedVideoUrl,
        description,
        price,
        category: selectedCategory,
      };

      try {
        await axios.post('https://adhikari-server.vercel.app/api/videos', videoData);
        alert('Video added successfully!');
        navigate('/videolist');
      } catch (error) {
        console.error('Error adding video to the database:', error);
        alert('Failed to add video. Please try again.');
      }
    }
  };

  const handleClose = () => {
    navigate('/videolist');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="relative max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-2xl border border-gray-300">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 transition duration-200 text-4xl p-1" // Increased size and added padding
        >
          &times; {/* Close button */}
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Add Video</h2>

          {/* Video Name Input */}
          <div className="mb-4">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaVideo className="text-blue-600 p-2 text-3xl font-bold" /> {/* Increased size and bold */}
              <input
                type="text"
                placeholder="Video Name"
                value={videoName}
                onChange={(e) => setVideoName(e.target.value)}
                required
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </label>
          </div>

          {/* Video File Input */}
          <div className="mb-4">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaFileUpload className="text-blue-600 p-2 text-3xl font-bold" /> {/* Increased size and bold */}
              <input
                type="file"
                onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
                required
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </label>
          </div>

          {/* Description Textarea */}
          <div className="mb-4">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaEdit className="text-blue-600 p-2 text-3xl font-bold" /> {/* Increased size and bold */}
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </label>
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaDollarSign className="text-blue-600 p-2 text-3xl font-bold" /> {/* Increased size and bold */}
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </label>
          </div>

          {/* Category Select */}
          <div className="mb-6">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaTag className="text-blue-600 p-2 text-3xl font-bold" /> {/* Increased size and bold */}
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500  to-purple-800 text-white py-2 rounded hover:bg-gradient-to-l transition duration-200"
          >
            <strong>Add Video</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
