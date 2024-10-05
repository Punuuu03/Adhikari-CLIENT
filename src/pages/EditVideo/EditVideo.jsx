/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead
import { FaVideo, FaFileUpload, FaEdit, FaDollarSign } from 'react-icons/fa'; // Import icons

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [videoData, setVideoData] = useState({
    name: '',
    videoUrl: '',
    description: '',
    price: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`https://adhikari-server.vercel.app/api/videos/${id}`);
        setVideoData(response.data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://adhikari-server.vercel.app/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchVideo();
    fetchCategories();
  }, [id]);

  const handleVideoUpload = async () => {
    if (!videoFile) return videoData.videoUrl; // Keep the current video URL if no new file is uploaded

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', 'h5ahb6iv');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dednblbo3/video/upload', formData);
      return res.data.secure_url;
    } catch (error) {
      console.error('Error uploading video:', error);
      return videoData.videoUrl; // Fallback to current video URL on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const videoUrl = await handleVideoUpload();

    const updatedVideoData = {
      ...videoData,
      videoUrl,
    };

    try {
      await axios.put(`https://adhikari-server.vercel.app/api/videos/${id}`, updatedVideoData);
      alert('Video updated successfully!');
      navigate('/videolist'); // Navigate to video list page on success
    } catch (error) {
      console.error('Error updating video:', error);
      alert('Failed to update video.');
    }
  };

  const handleClose = () => {
    navigate('/videolist'); // Navigate back to video list page on close
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-500 ease-in-out">
      <div className="relative max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-2xl border border-gray-300">
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
        >
          X
        </button>
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Edit Video</h1>
        <form onSubmit={handleSubmit}>
          {/* Video Name Input */}
          <div className="mb-4">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaVideo className="text-blue-600 p-2 text-3xl font-bold" />
              <input
                type="text"
                placeholder="Video Name"
                value={videoData.name}
                onChange={(e) => setVideoData({ ...videoData, name: e.target.value })}
                required
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </label>
          </div>

          {/* Video File Input */}
          <div className="mb-4">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaFileUpload className="text-blue-600 p-2 text-3xl font-bold" />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </label>
          </div>

          {/* Description Textarea */}
          <div className="mb-4">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaEdit className="text-blue-600 p-2 text-3xl font-bold" />
              <textarea
                placeholder="Description"
                value={videoData.description}
                onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                required
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </label>
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <FaDollarSign className="text-blue-600 p-2 text-3xl font-bold" />
              <input
                type="number"
                placeholder="Price"
                value={videoData.price}
                onChange={(e) => setVideoData({ ...videoData, price: e.target.value })}
                required
                className="flex-grow p-2 border-none outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500  to-purple-800 text-white py-2 rounded hover:bg-gradient-to-l transition duration-200"
          >
            <strong>Update Video</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;
