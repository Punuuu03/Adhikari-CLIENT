/* eslint-disable no-unused-vars */
import React from 'react';
import users from '../../assets/users.png';
import order from '../../assets/order.png';
import revenue from '../../assets/revenue.png';
import approved from '../../assets/approved.png';
import moncoll from '../../assets/moncoll.png';
import sub from '../../assets/sub.png';
// import AdminDashboard from '../AdminDashboard/AdminDashboard';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for pie chart
);

const Dashboard = () => {
  // Line chart data for User Activity
  const userActivityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Flutter',
        data: [200, 300, 400, 500, 300, 200, 400, 500, 300, 200, 300, 400],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Java',
        data: [300, 200, 300, 200, 500, 400, 300, 200, 400, 500, 400, 300],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  // Bar chart data for Sales Dynamics
  const salesDynamicsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Online Sales',
        data: [100, 200, 150, 300, 250, 400, 350, 300, 200, 400, 450, 500],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 10,
        borderSkipped: false,
      },
      {
        label: 'Offline Sales',
        data: [150, 250, 200, 350, 300, 450, 400, 350, 250, 450, 500, 550],
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  // Pie chart data
  const pieChartData = {
    labels: ['Users', 'Subscr'],
    datasets: [
      {
        label: 'Distribution',
        data: [25, 15], // Replace with your actual data
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue for Users
          '#FFAD60',   // Orange for Subscr
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',    // Darker blue for Users
          '#FFAD60',     // Darker orange for Subscr
        ],
        borderWidth: 1,
      },
    ],
  };
  

  return (
    
    <div className="p-8 bg-gray-100">
      {/* Grid for cards */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
  <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
  
    {/* Revenue Card */}
    <div className="relative bg-green-200 p-2 rounded shadow transition-transform transform hover:scale-105 overflow-hidden">
    
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-green-300 rounded-full" style={{ borderTopLeftRadius: '0' }}></div>
      <img src={revenue} alt="Revenue" className="absolute bottom-4 right-4 w-12 h-12" />
      <h2 className="text-lg font-semibold">Revenue</h2>
      <p className="text-xl">2058</p>
      <p className="text-sm text-gray-500">1.19% since last month</p>
    </div>

    {/* Month Collection Card */}
    <div className="relative bg-blue-200 p-2 rounded shadow transition-transform transform hover:scale-105 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-300 rounded-full" style={{ borderTopLeftRadius: '0' }}></div>
      <img src={moncoll} alt="Month Collection" className="absolute bottom-4 right-4 w-12 h-12" />
      <h2 className="text-lg font-semibold">Month Collection</h2>
      <p className="text-xl">29325</p>
      <p className="text-sm text-gray-500">0.5% since last month</p>
    </div>

    {/* Subscriptions Card */}
    <div className="relative bg-yellow-200 p-2 rounded shadow transition-transform transform hover:scale-105 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-yellow-300 rounded-full" style={{ borderTopLeftRadius: '0' }}></div>
      <img src={sub} alt="Subscriptions" className="absolute bottom-4 right-4 w-12 h-12" />
      <h2 className="text-lg font-semibold">Subscriptions</h2>
      <p className="text-xl">398</p>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">70% Paid</span>
      </div>
    </div>

    {/* Users Card */}
    <div className="relative bg-purple-200 p-2 rounded shadow transition-transform transform hover:scale-105 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-300 rounded-full" style={{ borderTopLeftRadius: '0' }}></div>
      <img src={users} alt="Users" className="absolute bottom-4 right-4 w-12 h-12" />
      <h2 className="text-lg font-semibold">Users</h2>
      <p className="text-xl">5032</p>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">62% New</span>
      </div>
    </div>
  </div>

        {/* Pie Chart Container */}
        {/* Pie Chart Container */}
<div className="bg-white p-4 rounded shadow lg:col-span-1 flex items-center justify-center h-64">
  {/* Pie Chart */}
  <div className="flex items-center justify-center w-full h-full">
    <Pie data={pieChartData} />
  </div>
</div>

      </div>

      {/* Charts Row: User Activity and Sales Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* User Activity Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">User Activity</h2>
          <Line data={userActivityData} />
        </div>

        {/* Sales Dynamics Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Sales Dynamics</h2>
          <Bar data={salesDynamicsData} />
        </div>
      </div>

      {/* Customer Summary Table */}
      <div className="bg-white p-4 rounded shadow mt-8">
        <h2 className="text-xl font-semibold">Customer Summary</h2>
        <table className="min-w-full mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Customer Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Subscription</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with your dynamic data */}
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">Customer {index + 1}</td>
                <td className="p-2">customer{index + 1}@example.com</td>
                <td className="p-2">123-456-7890</td>
                <td className="p-2">Basic</td>
                <td className="p-2">Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
