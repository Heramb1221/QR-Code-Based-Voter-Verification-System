import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [time, setTime] = useState(new Date());
  const upcomingElection = {
    date: "2025-04-15",
    location: "New Delhi",
    type: "General Election",
  };

  const [editRequested, setEditRequested] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newDetails, setNewDetails] = useState({
    fullName: "",
    address: "",
    editReason: "",
    supportingDocs: null,
    additionalNotes: "",
  });
  const [uploading, setUploading] = useState(false);

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPasswordDetails, setNewPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [activityLog, setActivityLog] = useState([]);
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    profileApprovalNotifications: true,
  });

  const [verificationStatus, setVerificationStatus] = useState({});
  const [pollingStation, setPollingStation] = useState({});
  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const sessionTimeoutLimit = 10 * 60 * 1000; // 10 minutes
  const [activeTab, setActiveTab] = useState("election");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user ID from authentication context or storage
    const fetchUserData = async () => {
      try {
        // Get user ID from auth context or storage
        // This is just a placeholder - replace with your actual auth method
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        // Get user ID and basic profile information
        const userResponse = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUserId(userResponse.data.id);
        
        // Get activity log
        const activityResponse = await axios.get('/api/user/activity-log', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActivityLog(activityResponse.data);
        
        // Get verification status
        const verificationResponse = await axios.get('/api/user/verification-status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVerificationStatus(verificationResponse.data);
        
        // Get polling station info
        const pollingResponse = await axios.get('/api/user/polling-station', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPollingStation(pollingResponse.data);
        
        // Check if there's a pending edit request
        const editRequestResponse = await axios.get('/api/user/edit-request-status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditRequested(editRequestResponse.data.pending);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        setLoading(false);
      }
    };

    fetchUserData();

    const timer = setInterval(() => setTime(new Date()), 1000);
    const interval = setInterval(() => {
      if (new Date() - lastActivityTime > sessionTimeoutLimit) {
        alert("Session expired due to inactivity. Please log in again.");
        navigate('/login');
      }
    }, 1000);

    // Log user activity
    const logActivity = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          await axios.post('/api/user/log-activity', 
            { activity: 'Viewed profile page' },
            { headers: { Authorization: `Bearer ${token}` }}
          );
        }
      } catch (error) {
        console.error("Error logging activity:", error);
      }
    };
    
    logActivity();
    
    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, [lastActivityTime, navigate]);

  const handleUserActivity = () => {
    setLastActivityTime(new Date());
  };

  const handleApplyEdit = () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("fullName", newDetails.fullName);
    formData.append("address", newDetails.address);
    formData.append("editReason", newDetails.editReason);
    formData.append("additionalNotes", newDetails.additionalNotes);
    if (newDetails.supportingDocs) {
      formData.append("supportingDocs", newDetails.supportingDocs);
    }

    const token = localStorage.getItem('authToken');
    
    axios.post('/api/user/edit-request', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setEditRequested(true);
        setModalIsOpen(false);
        alert("Edit request has been submitted.");
      })
      .catch(error => {
        console.error("Error submitting edit request:", error);
        alert("Failed to submit edit request. Please try again.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handleChangePassword = () => {
    if (newPasswordDetails.newPassword === newPasswordDetails.confirmNewPassword) {
      const token = localStorage.getItem('authToken');
      
      axios.post('/api/user/change-password', {
        oldPassword: newPasswordDetails.oldPassword,
        newPassword: newPasswordDetails.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          alert("Password changed successfully.");
          setShowChangePasswordModal(false);
        })
        .catch(error => {
          console.error("Error changing password:", error);
          if (error.response && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("Failed to change password. Please try again.");
          }
        });
    } else {
      alert("New passwords do not match.");
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    handleUserActivity();
  };

  const calculateTimeLeft = () => {
    const electionDate = new Date(upcomingElection.date);
    const currentTime = new Date();
    const difference = electionDate - currentTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { days, hours };
  };

  const { days, hours } = calculateTimeLeft();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-indigo-200 to-green-300 p-6 flex justify-center items-center">
        <div className="text-2xl text-blue-800">Loading profile data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-indigo-200 to-green-300 p-6" onClick={handleUserActivity}>
      <div className="flex flex-col sm:flex-row sm:space-x-6">
        {/* Left Section - Tabs, Election, Activity Log, Polling Station */}
        <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-xl mb-6 sm:mb-0">
          <h2 className="text-2xl font-bold text-blue-800">Profile Navigation</h2>
          <div className="flex flex-col space-y-4 mt-4">
            <button
              className={`px-4 py-2 rounded-md ${activeTab === "election" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => handleTabClick("election")}
            >
              Upcoming Election
            </button>
            <button
              className={`px-4 py-2 rounded-md ${activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => handleTabClick("profile")}
            >
              Profile Summary
            </button>
          </div>

          {/* Upcoming Election */}
          {activeTab === "election" && (
            <div className="mt-6">
              <h3 className="font-semibold">Upcoming Election</h3>
              <ul>
                <li>Date: {upcomingElection.date}</li>
                <li>Location: {upcomingElection.location}</li>
                <li>Type: {upcomingElection.type}</li>
                <li>Countdown: {days} days {hours} hours</li>
              </ul>
            </div>
          )}

          {/* User Activity Log */}
          <div className="mt-6">
            <h3 className="font-semibold">User Activity Log</h3>
            <ul className="max-h-40 overflow-y-auto">
              {activityLog.map((log, index) => (
                <li key={index} className="text-sm py-1 border-b border-gray-100">
                  {log.activity} - {log.date}
                </li>
              ))}
            </ul>
          </div>

          {/* Polling Station */}
          <div className="mt-6">
            <h3 className="font-semibold">Polling Station</h3>
            <p>Nearest Polling Station: {pollingStation.nearestStation || "Not assigned yet"}</p>
            <p>Distance: {pollingStation.distance || "N/A"}</p>
          </div>

          {/* Apply for Edit Option */}
          <div className="mt-6">
            {!editRequested ? (
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                onClick={() => setModalIsOpen(true)}
              >
                Apply for Profile Edit
              </button>
            ) : (
              <p className="text-green-500">Your profile edit request has been submitted. Please wait for admin verification.</p>
            )}
          </div>

          {/* Change Password */}
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Right Section - User Profile Card */}
        <div className="w-full sm:w-2/3 bg-white p-6 rounded-lg shadow-xl">
          {userId && <Card userId={userId} />}
        </div>
      </div>

      {/* Modal for Profile Edit */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
        <h2 className="text-xl font-bold text-blue-700">Edit Profile Details</h2>
        <div className="mt-4">
          <input
            type="text"
            value={newDetails.fullName}
            onChange={(e) => setNewDetails({ ...newDetails, fullName: e.target.value })}
            placeholder="Full Name"
            className="p-2 rounded-md border border-gray-300 w-full mb-4"
          />
          <textarea
            value={newDetails.address}
            onChange={(e) => setNewDetails({ ...newDetails, address: e.target.value })}
            placeholder="Address"
            className="p-2 rounded-md border border-gray-300 w-full mb-4"
          />
          <textarea
            value={newDetails.editReason}
            onChange={(e) => setNewDetails({ ...newDetails, editReason: e.target.value })}
            placeholder="Reason for Edit"
            className="p-2 rounded-md border border-gray-300 w-full mb-4"
          />
          <input
            type="file"
            onChange={(e) => setNewDetails({ ...newDetails, supportingDocs: e.target.files[0] })}
            className="mb-4"
          />
          <textarea
            value={newDetails.additionalNotes}
            onChange={(e) => setNewDetails({ ...newDetails, additionalNotes: e.target.value })}
            placeholder="Additional Notes"
            className="p-2 rounded-md border border-gray-300 w-full mb-4"
          />
          <div className="flex justify-between">
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyEdit}
              disabled={uploading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {uploading ? "Submitting..." : "Submit Edit Request"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal for Password Change */}
      <Modal isOpen={showChangePasswordModal} onRequestClose={() => setShowChangePasswordModal(false)} ariaHideApp={false}>
        <h2 className="text-xl font-bold text-blue-700">Change Password</h2>
        <div className="mt-4">
          <input
            type="password"
            value={newPasswordDetails.oldPassword}
            onChange={(e) => setNewPasswordDetails({ ...newPasswordDetails, oldPassword: e.target.value })}
            placeholder="Old Password"
            className="p-2 rounded-md border border-gray-300 w-full mb-4"
          />
          <input
            type="password"
            value={newPasswordDetails.newPassword}
            onChange={(e) => setNewPasswordDetails({ ...newPasswordDetails, newPassword: e.target.value })}
            placeholder="New Password"
            className="p-2 rounded-md border border-gray-300 w-full mb-4"
          />
          <input
            type="password"
            value={newPasswordDetails.confirmNewPassword}
            onChange={(e) => setNewPasswordDetails({ ...newPasswordDetails, confirmNewPassword: e.target.value })}
            placeholder="Confirm New Password"
            className="p-2 rounded-md border border-gray-300 w-full mb-4"
          />
          <div className="flex justify-between">
            <button
              onClick={() => setShowChangePasswordModal(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleChangePassword}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Change Password
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;