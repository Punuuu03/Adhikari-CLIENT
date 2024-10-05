/* eslint-disable no-unused-vars */
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for ChartJS to work with react-chartjs-2
import course from '../../assets/course.png';
import complete from '../../assets/complete.png';
import pregress from '../../assets/progress.png';

const StudentDashboard = () => {
  // Dummy data for the charts
  const studentData = {
    completedCourses: 2,
    totalCourses: 5,
    learningProgress: 55, // Progress in percentage
    watchingProgress: 40, // Progress in percentage
    courses: [
      { name: 'Mathematics', date: '2024-09-01' },
      { name: 'Science', date: '2024-09-10' },
      { name: 'History', date: '2024-09-15' },
      { name: 'Geography', date: '2024-09-25' },
    ],
  };

  // Bar chart data for Course Completion
  const courseCompletionData = {
    labels: ['Completed Courses', 'Not Completed Courses'],
    datasets: [
      {
        label: 'Courses',
        data: [
          studentData.completedCourses,
          studentData.totalCourses - studentData.completedCourses,
        ],
        backgroundColor: ['#FFAD60', '#FD8B51'],
        hoverBackgroundColor: ['#FFA726', '#FF7043'],
      },
    ],
  };

  const progressData = {
    labels: ['Learning Completed', 'Learning Remaining'],
    datasets: [
      {
        label: 'Progress',
        data: [studentData.learningProgress, 100 - studentData.learningProgress],
        backgroundColor: ['#2196F3', '#64B5F6'], // Blue and Light Blue shades
        hoverBackgroundColor: ['#1976D2', '#42A5F5'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Courses */}
        <div className="relative bg-blue-200 shadow-lg p-6 rounded-lg transition transform hover:scale-105 duration-300 hover:shadow-xl flex flex-row items-center overflow-hidden">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Total Courses</h3>
            <p className="text-4xl font-bold">{studentData.totalCourses}</p>
          </div>
          <div className="absolute bottom-0 right-0">
            <svg
              className="w-28 h-28 transform rotate-90 transition-transform duration-300"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 A150,150 0 0,1 100,0 L0,0 Z"
                fill="#1E88E5"
              />
            </svg>
            <img
              src={course}
              alt="Total Courses"
              className="absolute w-20 h-20 object-cover rounded-full bottom-8 right-8"
            />
          </div>
        </div>

        {/* Card 2: Completed Courses */}
        <div className="relative bg-green-200 shadow-lg p-6 rounded-lg transition transform hover:scale-105 duration-300 hover:shadow-xl flex flex-row items-center overflow-hidden">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Completed Courses</h3>
            <p className="text-4xl font-bold">{studentData.completedCourses}</p>
          </div>
          <div className="absolute bottom-0 right-0">
            <svg
              className="w-28 h-28 transform rotate-90 transition-transform duration-300"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 A150,150 0 0,1 100,0 L0,0 Z"
                fill="#388E3C"
              />
            </svg>
            <img
              src={complete}
              alt="Completed Courses"
              className="absolute w-20 h-20 object-cover rounded-full bottom-8 right-8"
            />
          </div>
        </div>

        {/* Card 3: Learning Progress */}
        <div className="relative bg-yellow-200 shadow-lg p-6 rounded-lg transition transform hover:scale-105 duration-300 hover:shadow-xl flex flex-row items-center overflow-hidden">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Learning Progress</h3>
            <p className="text-4xl font-bold">{studentData.learningProgress}%</p>
          </div>
          <div className="absolute bottom-0 right-0">
            <svg
              className="w-28 h-28 transform rotate-90 transition-transform duration-300"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 A150,150 0 0,1 100,0 L0,0 Z"
                fill="#FBC02D"
              />
            </svg>
            <img
              src={pregress}
              alt="Learning Progress"
              className="absolute w-20 h-20 object-cover rounded-full bottom-8 right-8"
            />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Bar Chart for Course Completion */}
        <div className="bg-indigo-100 shadow-lg p-6 rounded-lg flex-1 transition transform hover:scale-105 duration-300 hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">Course Completion</h3>
          <div className="w-full h-80">
            <Bar
              data={courseCompletionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 1500,
                  easing: 'easeInOutBounce',
                },
                plugins: {
                  tooltip: {
                    backgroundColor: '#FF7043',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                  },
                },
                layout: {
                  padding: {
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 20,
                  },
                },
              }}
              height={400}
            />
          </div>
        </div>

        {/* Pie Chart for Learning Progress */}
        <div className="bg-indigo-100 shadow-lg p-6 rounded-lg flex-1 transition transform hover:scale-105 duration-300 hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">Learning Progress</h3>
          <div className="w-full h-80">
            <Pie
              data={progressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 1500,
                  easing: 'easeInOutBounce',
                },
                plugins: {
                  tooltip: {
                    backgroundColor: '#1976D2',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                  },
                },
                layout: {
                  padding: {
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 20,
                  },
                },
              }}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
