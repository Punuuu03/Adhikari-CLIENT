/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const UpscGallery = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]); // State for filtered videos
  const videoRefs = useRef({});
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const messages = [
    {
      heading: "Master the UPSC with Our Exclusive Video Series",
      paragraph: "Welcome to the UPSC Video Gallery. These carefully curated videos are designed to help you prepare for the Union Public Service Commission exams, covering topics ranging from history, geography, and economics to current affairs and interview tips."
    },
    {
      heading: "Prepare with Expert Instructors and Comprehensive Lessons",
      paragraph: "Our expert instructors will guide you through the most important concepts and strategies to help you succeed in your UPSC journey. Browse through the videos below for complete access to comprehensive lessons and study materials!"
    },
    {
      heading: "Join Thousands of Successful UPSC Candidates",
      paragraph: "Unlock full access to study materials and tips that have helped thousands achieve their UPSC goals. Start your preparation today and pave your way to success!"
    }
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const upscCategoryId = '66ff70a7330756e164d90aad'; // Replace with your actual UPSC category ID
        const response = await axios.get(`https://adhikari-server.vercel.app/api/videos/category/${upscCategoryId}`);
        setVideos(response.data);
        setFilteredVideos(response.data); // Initialize filtered videos
      } catch (error) {
        console.error('Error fetching UPSC videos:', error);
      }
    };

    fetchVideos();

    // Set interval for cycling through messages
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Filter videos based on the search query
    const filtered = videos.filter(video => {
      const nameMatch = video.name.toLowerCase().includes(searchQuery.toLowerCase());
      const priceMatch = video.price.toString().includes(searchQuery); // Filter by price
      return nameMatch || priceMatch; // Return true if either condition matches
    });
    setFilteredVideos(filtered); // Update filtered videos state
  }, [searchQuery, videos]); // Run effect when searchQuery or videos change

  const handleVideoClick = (videoId) => {
    if (videoRefs.current[videoId]) {
      const videoElement = videoRefs.current[videoId];

      if (playingVideoId === videoId) {
        videoElement.pause();
        setPlayingVideoId(null);
      } else {
        if (playingVideoId !== null && videoRefs.current[playingVideoId]) {
          videoRefs.current[playingVideoId].pause();
        }

        videoElement.play();
        setPlayingVideoId(videoId);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Additional Content Section */}
      <div className="text-center mb-8 w-full">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="mb-2">
            <h1 className="text-4xl font-extrabold text-gray-800 leading-snug tracking-wide">
              {messages[currentMessageIndex].heading} {/* Display the current heading */}
            </h1>
          </div>
          <hr />
          <div className="bg-blue-100 shadow-lg rounded-lg p-4"> {/* Reduced padding */}
            <p className="text-lg text-gray-600 leading-relaxed transition duration-500 hover:text-gray-800">
              {messages[currentMessageIndex].paragraph} {/* Display the current paragraph */}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar and Heading Layout */}
      <div className="flex justify-between mb-3">
        <h2 className="text-3xl font-bold">UPSC Video</h2>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name or price"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Video Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"> {/* Updated grid-cols to 4 for larger screens */}
        {filteredVideos.map((video) => (
          <div className="video-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center max-w-xs" key={video._id}>
            
            {/* Video Player */}
            <div className="relative w-full h-36 "> {/* Add shadow effect here */}
              <video
                ref={(el) => (videoRefs.current[video._id] = el)} 
                onClick={() => handleVideoClick(video._id)} 
                className="w-full h-full object-cover rounded-lg" 
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVideoClick(video._id);
                }} 
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   text-white rounded-full p-3 cursor-pointer shadow-lg 
                  ${playingVideoId === video._id ? 'hidden' : 'flex'}`}
              >
                <span className="text-3xl">▶</span> 
              </button>
            </div>
           
            {/* Video Name with Emoji */}
            <div className="p-1 flex flex-col items-center text-center rounded-lg"> {/* Reduced padding */}
              <h3 className="text-xl font-bold uppercase text-gray-800 font-sans flex items-center gap-1"> {/* Reduced gap between emoji and name */}
                🎓 {video.name} {/* Graduation cap emoji for name */}
              </h3>

              {/* Description */}
              <p className="text-sm uppercase text-gray-600 my-1 font-sans">🏆 {video.description}</p>

              {/* Price with Rupee Symbol */}
              <p className="text-lg font-bold uppercase text-gray-800 my-1 font-sans flex items-center gap-1"> {/* Reduced gap */}
                ₹ {video.price} {/* Rupee symbol for price */}
              </p>

              {/* Enroll Button */}
              <button className="enroll-button mt-1 px-2 py-1 bg-gradient-to-r bg-blue-500  text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpscGallery;
