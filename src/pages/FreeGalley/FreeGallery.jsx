/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const FreeGallery = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]); // State for filtered videos
  const videoRefs = useRef({});
  const [playingVideoId, setPlayingVideoId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input

  const messages = [
    {
      heading: "Discover Free Learning Videos",
      paragraph: "Welcome to the Free Video Gallery. Explore a curated collection of educational content available for you at no cost."
    },
    {
      heading: "Watch Anytime, Anywhere",
      paragraph: "Our videos are designed to facilitate learning at your convenience. Dive into the world of knowledge with our expertly crafted content!"
    },
    {
      heading: "Join Our Learning Community",
      paragraph: "Engage with our community and enhance your learning journey. Start watching today and unlock the potential of education!"
    }
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const freeCategoryId = '66ff70b7330756e164d90ab5'; // Replace with actual Free category ID
        const response = await axios.get(`https://adhikari-server.vercel.app/api/videos/category/${freeCategoryId}`);
        setVideos(response.data);
        setFilteredVideos(response.data); // Initialize filtered videos
      } catch (error) {
        console.error('Error fetching free videos:', error);
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
          <div className="bg-blue-100 shadow-lg rounded-lg p-4">
            <p className="text-lg text-gray-600 leading-relaxed transition duration-500 hover:text-gray-800">
              {messages[currentMessageIndex].paragraph} {/* Display the current paragraph */}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar and Heading Layout
      <div className="flex justify-between mb-3">
        <h2 className="text-3xl font-bold">Free Learning Videos</h2>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name or price"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div> */}

      {/* Video Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredVideos.map((video) => (
          <div className="video-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center max-w-xs" key={video._id}>
            {/* Video Player */}
            <div className="relative w-full h-36">
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
            <div className="p-1 flex flex-col items-center text-center rounded-lg">
              <h3 className="text-xl font-bold uppercase text-gray-800 font-sans flex items-center gap-1">
                🎓 {video.name} {/* Graduation cap emoji for name */}
              </h3>

              {/* Description */}
              <p className="text-sm uppercase text-gray-600 my-1 font-sans">🏆 {video.description}</p>

              {/* Price with Rupee Symbol */}
              <p className="text-lg font-bold uppercase text-gray-800 my-1 font-sans flex items-center gap-1">
                ₹ {video.price} {/* Rupee symbol for price */}
              </p>

              {/* Enroll Button */}
              <button className="enroll-button mt-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                WATCH FOR FREE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeGallery;
