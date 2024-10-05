/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSearch, FaPlay } from 'react-icons/fa'; // Import icons

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://adhikari-server.vercel.app/api/videos');
        setVideos(response.data);
        setFilteredVideos(response.data); // Initialize filteredVideos with all videos
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    // Filter videos based on the search term
    if (searchTerm) {
      const filtered = videos.filter(video =>
        video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos); // Reset to original videos if search term is empty
    }
  }, [searchTerm, videos]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://adhikari-server.vercel.app/api/videos/${id}`);
      setVideos(videos.filter((video) => video._id !== id));
      setFilteredVideos(filteredVideos.filter((video) => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name, category, or description..."
            className="border border-gray-300 rounded-lg py-2 px-4 pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
        <Link to="/addvideo">
          <button className="bg-gradient-to-r from-blue-500 to-purple-800 text-white py-2 px-4 rounded hover:bg-gradient-to-l transition">
            Add Video
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
        <thead className="bg-gray-300">
          <tr>
            <th className="py-2 px-4 text-left text-black w-1/12">#</th>
            <th className="py-2 px-4 text-left text-black w-1/6">Video Name</th>
            <th className="py-2 px-4 text-left text-black w-1/6">Category</th>
            <th className="py-2 px-4 text-left text-black w-1/6">Price</th>
            <th className="py-2 px-4 text-left text-black w-1/6">Description</th>
            <th className="py-2 px-4 text-left text-black w-1/6">Video</th>
            <th className="py-2 px-4 text-left text-black w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredVideos.map((video, index) => (
    <tr 
      key={video._id} 
      className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
    >
      <td className="py-4 px-4 w-1/12">{index + 1}</td> {/* Increase padding here */}
      <td className="py-4 px-4 w-1/6">{video.name}</td>
      <td className="py-4 px-4 w-1/6">{video.category.name}</td>
      <td className="py-4 px-4 w-1/6">{video.price}</td>
      <td className="py-4 px-4">{video.description}</td>
      <td className="py-4 px-4 w-1/6">
        <Link to={`/videoplayer/${video._id}`}>
          <button 
            onClick={() => handleWatchVideo(video._id)} 
            className="text-green-500 hover:underline flex items-center mr-4"
          >
            <FaPlay size={20} className="mr-1" /> Watch Video
          </button>
        </Link>
      </td>
      <td className="py-4 px-4 w-1/6 flex items-center">
        <Link to={`/editvideo/${video._id}`} className="text-blue-500 hover:underline mr-4 flex items-center">
          <FaEdit size={20} className="mr-1" /> 
        </Link>
        <button 
          onClick={() => handleDelete(video._id)} 
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

export default VideoList;
