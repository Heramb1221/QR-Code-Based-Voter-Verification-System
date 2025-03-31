import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiBell } from "react-icons/fi";

const Notification = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      title: "System Maintenance",
      message:
        "The portal will be down for scheduled maintenance from 1 AM to 3 AM IST on April 5th, 2025.",
      type: "system",
      date: "31 Mar 2025",
      status: "active",
    },
    {
      id: 2,
      title: "GST Filing Reminder",
      message:
        "Please be reminded that the last date for quarterly GST filing is April 20th, 2025.",
      type: "important",
      date: "29 Mar 2025",
      status: "active",
    },
    {
      id: 3,
      title: "New Feature: Digital Signatures",
      message:
        "We've added support for DigiLocker verified digital signatures for all legal documents.",
      type: "update",
      date: "25 Mar 2025",
      status: "active",
    },
    {
      id: 4,
      title: "Diwali Holiday Schedule",
      message:
        "The office will remain closed from November 10th to November 14th, 2025 for Diwali celebrations.",
      type: "announcement",
      date: "20 Mar 2025",
      status: "scheduled",
    },
    {
      id: 5,
      title: "Independence Day Event",
      message:
        "Join us for the virtual flag hoisting ceremony on August 15th at 9 AM IST.",
      type: "event",
      date: "15 Mar 2025",
      status: "draft",
    },
  ];

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notif) => notif.status === filter);

  const getBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTabActiveClass = (value) => {
    return filter === value ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Notifications
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-around border rounded-lg">
            <button
              className={`py-2 px-4 w-full text-sm font-medium rounded-l-lg focus:outline-none ${getTabActiveClass('all')}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`py-2 px-4 w-full text-sm font-medium focus:outline-none ${getTabActiveClass('active')}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`py-2 px-4 w-full text-sm font-medium focus:outline-none ${getTabActiveClass('scheduled')}`}
              onClick={() => setFilter('scheduled')}
            >
              Scheduled
            </button>
            <button
              className={`py-2 px-4 w-full text-sm font-medium rounded-r-lg focus:outline-none ${getTabActiveClass('draft')}`}
              onClick={() => setFilter('draft')}
            >
              Draft
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredNotifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FiBell className="text-xl text-indigo-500" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      {notif.title}
                    </h2>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(notif.status)}`}>
                    {notif.status.charAt(0).toUpperCase() + notif.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{notif.message}</p>
                <div className="text-gray-500 text-sm">{notif.date}</div>
                <button className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
          {filteredNotifications.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No notifications found for the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;