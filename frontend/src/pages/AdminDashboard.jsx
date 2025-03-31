import React, { useState, useEffect } from "react";
import { FiUsers, FiFileText, FiSettings, FiLogOut, FiGrid } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ 
    users: 1247, 
    testimonials: 89, 
    feedbacks: 156 
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/admin/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Sidebar */}
      <div className="flex h-screen">
        <div className="w-64 bg-indigo-800 text-white p-6 flex flex-col">
          <div className="mb-10">
            <h2 className="text-2xl font-bold">Admin Portal</h2>
            <p className="text-indigo-200 text-sm">Bharat Management System</p>
          </div>

          <nav className="flex-grow">
            <ul className="space-y-2">
              <li>
                <Link to="/admin-dashboard" className="flex items-center p-3 bg-indigo-900 rounded-lg">
                  <FiGrid className="mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/users" className="flex items-center p-3 hover:bg-indigo-700 rounded-lg">
                  <FiUsers className="mr-3" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/content" className="flex items-center p-3 hover:bg-indigo-700 rounded-lg">
                  <FiFileText className="mr-3" />
                  <span>Content</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/settings" className="flex items-center p-3 hover:bg-indigo-700 rounded-lg">
                  <FiSettings className="mr-3" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto">
            <button className="w-full flex items-center justify-center p-3 bg-red-600 hover:bg-red-700 rounded-lg">
              <FiLogOut className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin</h1>
                <p className="text-gray-500">Here's what's happening today</p>
              </div>
              <div className="bg-white p-2 rounded-full shadow">
                  <RiAdminFill />
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.users}</p>
                    <p className="text-green-500 text-sm mt-1">+24 today</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FiUsers className="text-blue-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Feedbacks</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.feedbacks}</p>
                    <p className="text-green-500 text-sm mt-1">+12 this week</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FiFileText className="text-green-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Testimonials</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.testimonials}</p>
                    <p className="text-green-500 text-sm mt-1">+5 this week</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FiFileText className="text-purple-600 text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Management Sections */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Link to="/admin/users" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FiUsers className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">Manage Users</p>
                    <p className="text-gray-500">View and manage user accounts</p>
                  </div>
                </div>
              </Link>

              <Link to="/admin/content" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <FiSettings className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">Manage Content</p>
                    <p className="text-gray-500">Update website content and notifications</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Recent Activity */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-4">
                <div className="flex items-center pb-4 border-b border-gray-100">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <FiUsers className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-800">New user registered: <span className="font-medium">Amit Sharma</span></p>
                    <p className="text-gray-500 text-sm">Today, 10:30 AM</p>
                  </div>
                </div>

                <div className="flex items-center pb-4 border-b border-gray-100">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <FiFileText className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-800">New feedback received from <span className="font-medium">Priya Patel</span></p>
                    <p className="text-gray-500 text-sm">Yesterday, 15:45 PM</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-lg mr-4">
                    <FiSettings className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-800">System update completed</p>
                    <p className="text-gray-500 text-sm">Yesterday, 22:10 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;