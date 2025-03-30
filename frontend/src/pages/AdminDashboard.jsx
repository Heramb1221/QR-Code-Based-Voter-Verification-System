import React, { useState, useEffect } from "react";
import { FiUsers, FiFileText, FiSettings, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, testimonials: 0, feedbacks: 0 });

    useEffect(() => {
        // Fetch stats from backend (Placeholder example)
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
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 shadow rounded-lg flex items-center space-x-4">
                    <FiUsers className="text-blue-600 text-3xl" />
                    <div>
                        <p className="text-gray-500">Total Users</p>
                        <p className="text-xl font-bold">{stats.users}</p>
                    </div>
                </div>
                <div className="bg-white p-4 shadow rounded-lg flex items-center space-x-4">
                    <FiFileText className="text-green-600 text-3xl" />
                    <div>
                        <p className="text-gray-500">Testimonials</p>
                        <p className="text-xl font-bold">{stats.testimonials}</p>
                    </div>
                </div>
                <div className="bg-white p-4 shadow rounded-lg flex items-center space-x-4">
                    <FiFileText className="text-red-600 text-3xl" />
                    <div>
                        <p className="text-gray-500">Feedbacks</p>
                        <p className="text-xl font-bold">{stats.feedbacks}</p>
                    </div>
                </div>
            </div>

            {/* Management Sections */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/admin/users" className="bg-white p-6 shadow-lg rounded-lg hover:bg-gray-50 flex items-center space-x-4">
                    <FiUsers className="text-blue-500 text-3xl" />
                    <p className="text-lg font-semibold">Manage Users</p>
                </Link>
                <Link to="/admin/testimonials" className="bg-white p-6 shadow-lg rounded-lg hover:bg-gray-50 flex items-center space-x-4">
                    <FiFileText className="text-green-500 text-3xl" />
                    <p className="text-lg font-semibold">Manage Testimonials</p>
                </Link>
                <Link to="/admin/content" className="bg-white p-6 shadow-lg rounded-lg hover:bg-gray-50 flex items-center space-x-4">
                    <FiSettings className="text-purple-500 text-3xl" />
                    <p className="text-lg font-semibold">Manage Content</p>
                </Link>
            </div>

            {/* Logout Button */}
            <div className="mt-10 text-center">
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2">
                    <FiLogOut /> <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
