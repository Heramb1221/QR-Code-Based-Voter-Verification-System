import React, { useState } from "react";
import { FiArrowLeft, FiSearch, FiPlus, FiEdit2, FiTrash2, FiBell, FiFile, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

const ManageContent = () => {
  // Dummy notifications data with Indian context
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Maintenance",
      message: "The portal will be down for scheduled maintenance from 1 AM to 3 AM IST on April 5th, 2025.",
      type: "system",
      date: "31 Mar 2025",
      status: "active"
    },
    {
      id: 2,
      title: "GST Filing Reminder",
      message: "Please be reminded that the last date for quarterly GST filing is April 20th, 2025.",
      type: "important",
      date: "29 Mar 2025",
      status: "active"
    },
    {
      id: 3,
      title: "New Feature: Digital Signatures",
      message: "We've added support for DigiLocker verified digital signatures for all legal documents.",
      type: "update",
      date: "25 Mar 2025",
      status: "active"
    },
    {
      id: 4,
      title: "Diwali Holiday Schedule",
      message: "The office will remain closed from November 10th to November 14th, 2025 for Diwali celebrations.",
      type: "announcement",
      date: "20 Mar 2025",
      status: "scheduled"
    },
    {
      id: 5,
      title: "Independence Day Event",
      message: "Join us for the virtual flag hoisting ceremony on August 15th at 9 AM IST.",
      type: "event",
      date: "15 Mar 2025",
      status: "draft"
    }
  ]);

  // Content categories with Indian context
  const contentCategories = [
    { name: "Home Page", count: 5 },
    { name: "About Us", count: 3 },
    { name: "Services", count: 8 },
    { name: "Career", count: 4 },
    { name: "E-Filing", count: 6 },
    { name: "Resources", count: 12 },
    { name: "Schemes", count: 9 },
    { name: "Contact", count: 2 }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("notifications");

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadgeColor = (type) => {
    switch (type) {
      case "important": return "bg-red-100 text-red-800";
      case "update": return "bg-blue-100 text-blue-800";
      case "system": return "bg-purple-100 text-purple-800";
      case "event": return "bg-green-100 text-green-800";
      case "announcement": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link to="/admin-dashboard" className="mr-4">
              <FiArrowLeft className="text-gray-600 text-xl" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Manage Content</h1>
              <p className="text-gray-500">Create and manage website content and notifications</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'notifications' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'pages' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('pages')}
            >
              Page Content
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'media' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('media')}
            >
              Media Library
            </button>
          </div>
        </div>

        {activeTab === 'notifications' && (
          <>
            {/* Notifications Search and Add */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:w-1/2">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                <FiPlus /> Add New Notification
              </button>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div key={notification.id} className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <FiBell className="text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(notification.type)}`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500">Created: {notification.date}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                            {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                        <FiEye />
                      </button>
                      <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                        <FiEdit2 />
                      </button>
                      <button
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No notifications found matching your search criteria
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'pages' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Manage Page Content</h2>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                <FiPlus /> Add New Page
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contentCategories.map((category) => (
                <div key={category.name} className="bg-gray-100 rounded-lg shadow-sm p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">{category.name}</h3>
                    <span className="text-sm text-gray-500">{category.count} items</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                      <FiEdit2 />
                    </button>
                    <button className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Media Library</h2>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                <FiPlus /> Upload New Media
              </button>
            </div>
            <p className="text-gray-500">This section will display uploaded images, documents, and other media files.</p>
            {/* Placeholder for Media Library */}
            <div className="mt-6 border rounded-md border-gray-200 p-6 text-center text-gray-400">
              <FiFile className="mx-auto text-4xl mb-2" />
              No media files uploaded yet.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageContent;