/* eslint-disable no-unused-vars */
import React from "react";

const CourseCard = () => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-200">
      {/* Header Image */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUzucAF8wAfL387uNj5uQ2nqwmR2mFBIzWQ&s"
        alt="Course Banner"
        className="w-full h-44 object-cover"
      />

      {/* Course Details */}
      <div className="p-4">
        {/* Course Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          20th MAY 2024 BANKING/SSC INTEGRATED (ONLINE)
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-2">
          🏆 BANKING+STAFF SELECTION COMMISSION COURSE. (OFFLINE + ONLINE)
        </p>

        {/* Price Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-red-600">₹11800</div>
          <div className="line-through text-gray-500">₹17700</div>
          <div className="text-green-600 text-sm font-semibold">
            33.33% off
          </div>
        </div>

        {/* Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;


