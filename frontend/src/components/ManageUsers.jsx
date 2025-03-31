import React, { useState } from "react";
import { FiArrowLeft, FiSearch, FiFilter, FiUserCheck, FiUserX } from "react-icons/fi";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      location: "New Delhi",
      joined: "12 Jan 2025",
      status: "Active",
      blocked: false
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@outlook.com",
      location: "Mumbai",
      joined: "25 Feb 2025",
      status: "Active",
      blocked: false
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@yahoo.com",
      location: "Bangalore",
      joined: "03 Mar 2025",
      status: "Inactive",
      blocked: false
    },
    {
      id: 4,
      name: "Deepak Verma",
      email: "deepak.verma@hotmail.com",
      location: "Chennai",
      joined: "18 Feb 2025",
      status: "Active",
      blocked: true
    },
    {
      id: 5,
      name: "Sneha Reddy",
      email: "sneha.reddy@gmail.com",
      location: "Hyderabad",
      joined: "05 Jan 2025",
      status: "Active",
      blocked: false
    },
    {
      id: 6,
      name: "Rajesh Singh",
      email: "rajesh.singh@outlook.com",
      location: "Kolkata",
      joined: "27 Feb 2025",
      status: "Inactive",
      blocked: true
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const toggleBlockStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, blocked: !user.blocked } : user
    ));
  };

  const unblockAllUsers = () => {
    setUsers(users.map(user => ({ ...user, blocked: false })));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "All") return matchesSearch;
    if (filterStatus === "Active") return matchesSearch && user.status === "Active";
    if (filterStatus === "Inactive") return matchesSearch && user.status === "Inactive";
    if (filterStatus === "Blocked") return matchesSearch && user.blocked;

    return matchesSearch;
  });

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
              <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
              <p className="text-gray-500">View and manage all user accounts</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
              <Link to="/create-user" className="mr-4">
              Add New User
            </Link>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <FiFilter className="text-gray-500 mr-2" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Users</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.blocked ? 'bg-red-100 text-red-800' :
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {user.blocked ? 'Blocked' : user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => toggleBlockStatus(user.id)}
                          className={`${user.blocked ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'} p-2 rounded-lg`}
                        >
                          {user.blocked ? <FiUserCheck /> : <FiUserX />}
                        </button>
                        <button className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-lg">
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No users found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Unblock All Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={unblockAllUsers}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Unblock All Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;