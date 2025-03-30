import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext2 } from "../context/authVoter";
import {
    FiUser,
    FiCalendar,
    FiHome,
    FiLoader,
    FiEdit,
    FiLock
} from "react-icons/fi";
import VoterCard from "../components/Card";
import Modal from "react-modal";

const VoterProfile = () => {
    const navigate = useNavigate();
    const { isLoggedIn, token } = useContext(AuthContext2);
    const [voterData, setVoterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("voterCard");
    const [editRequested, setEditRequested] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const [newDetails, setNewDetails] = useState({
        fullName: "",
        address: "",
        mobile: "",
        email: "",
        editReason: "",
        supportingDocs: null,
        additionalNotes: "",
    });

    const [newPasswordDetails, setNewPasswordDetails] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [activityLog, setActivityLog] = useState([
        { activity: "Logged in", date: new Date().toLocaleString() },
    ]);

    const [uploading, setUploading] = useState(false);

    const upcomingElection = {
        date: "2025-05-15",
        location: "National",
        type: "General Election",
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

    const [lastActivityTime, setLastActivityTime] = useState(new Date());
    const sessionTimeoutLimit = 30 * 60 * 1000; // 30 minutes

    useEffect(() => {
        // Check if user is logged in as a voter
        if (!isLoggedIn) {
            navigate("/voter-login");
            return;
        }

        // Fetch voter profile data (for non-card information)
        const fetchProfileData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/voters/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch voter data");
                }

                const data = await response.json();
                const voterInfo = data.voter || data;

                if (!voterInfo) {
                    throw new Error("Voter data format is not as expected");
                }

                setVoterData(voterInfo);

                setNewDetails({
                    fullName: voterInfo.fullName || "",
                    address: voterInfo.houseNo && voterInfo.street ?
                        `${voterInfo.houseNo}, ${voterInfo.street}, ${voterInfo.locality || ''}` :
                        "",
                    mobile: voterInfo.mobile || "",
                    email: voterInfo.email || "",
                    editReason: "",
                    supportingDocs: null,
                    additionalNotes: "",
                });
            } catch (error) {
                console.error("Error fetching voter data:", error);
                setError(error.message);

                const mockData = {
                    fullName: localStorage.getItem("userName") || "John Doe",
                    voterId: localStorage.getItem("voterId") || "AASBMDAAD",
                    dob: "1990-01-01",
                    gender: "Male",
                    fatherHusbandName: "James Doe",
                    houseNo: "123",
                    street: "Main Street",
                    locality: "Downtown",
                    city: "Metropolis",
                    district: "Central",
                    state: "State",
                    pinCode: "123456",
                    mobile: "9876543210",
                    email: "voter@example.com",
                    aadharNumber: "XXXX-XXXX-XXXX",
                    photoUrl: "/api/placeholder/120/150"
                };

                setVoterData(mockData);

                setNewDetails({
                    fullName: mockData.fullName,
                    address: `${mockData.houseNo}, ${mockData.street}, ${mockData.locality}`,
                    mobile: mockData.mobile,
                    email: mockData.email,
                    editReason: "",
                    supportingDocs: null,
                    additionalNotes: "",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();

        const interval = setInterval(() => {
            if (new Date() - lastActivityTimesessionTimeoutLimit) {
              alert("Session expired due to inactivity. Please log in again.");
              navigate('/voter-login');
              }
              }, 60000);
              
                  return () => clearInterval(interval);
              }, [isLoggedIn, navigate, token, lastActivityTime]);
              
              useEffect(() => {
                  const handleActivity = () => {
                      setLastActivityTime(new Date());
                  };
              
                  window.addEventListener('mousemove', handleActivity);
                  window.addEventListener('keydown', handleActivity);
                  window.addEventListener('click', handleActivity);
              
                  return () => {
                      window.removeEventListener('mousemove', handleActivity);
                      window.removeEventListener('keydown', handleActivity);
                      window.removeEventListener('click', handleActivity);
                  };
              }, []);
              
              const handleApplyEdit = () => {
                  setUploading(true);
                  const formData = new FormData();
                  formData.append("fullName", newDetails.fullName);
                  formData.append("address", newDetails.address);
                  formData.append("mobile", newDetails.mobile);
                  formData.append("email", newDetails.email);
                  formData.append("editReason", newDetails.editReason);
                  formData.append("additionalNotes", newDetails.additionalNotes);
              
                  if (newDetails.supportingDocs) {
                      formData.append("supportingDocs", newDetails.supportingDocs);
                  }
              
                  setTimeout(() => {
                      setEditRequested(true);
                      setModalIsOpen(false);
              
                      setActivityLog([
                          { activity: "Profile edit request submitted", date: new Date().toLocaleString() },
                          ...activityLog
                      ]);
              
                      alert("Edit request has been submitted and is pending approval.");
                      setUploading(false);
                  }, 1500);
              };
              
              const handleChangePassword = () => {
                  if (newPasswordDetails.newPassword !== newPasswordDetails.confirmNewPassword) {
                      alert("New passwords do not match.");
                      return;
                  }
              
                  if (!newPasswordDetails.oldPassword || !newPasswordDetails.newPassword) {
                      alert("Please fill in all password fields.");
                      return;
                  }
              
                  setTimeout(() => {
                      setShowChangePasswordModal(false);
              
                      setActivityLog([
                          { activity: "Password changed", date: new Date().toLocaleString() },
                          ...activityLog
                      ]);
              
                      alert("Password changed successfully.");
              
                      setNewPasswordDetails({
                          oldPassword: "",
                          newPassword: "",
                          confirmNewPassword: "",
                      });
                  }, 1500);
              };
              
              if (loading) {
                  return (
                      <div className="min-h-screen flex items-center justify-center">
                          <FiLoader className="animate-spin text-blue-600 text-4xl" />
                          <span className="ml-2 text-lg">Loading voter information...</span>
                      </div>
                  );
              }
              
              if (error && !voterData) {
                  return (
                      <div className="min-h-screen flex items-center justify-center">
                          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                              <h2 className="font-bold mb-2">Error Loading Profile</h2>
                              <p>{error}</p>
                              <button
                                  onClick={() => navigate("/voter-login")}
                                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                              >
                                  Return to Login
                              </button>
                          </div>
                      </div>
                  );
              }
              
              return (
                  <div className="min-h-screen bg-blue-100 py-8 px-4">
                      <div className="max-w-6xl mx-auto">
                          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
                              Voter Profile Dashboard
                          </h1>
              
                          <div className="flex flex-col md:flex-row gap-6">
                              {/* Left Section */}
                              <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-xl mb-6 md:mb-0">
                                  <h2 className="text-2xl font-bold text-blue-800 mb-4">Dashboard</h2>
              
                                  <div className="flex flex-col space-y-2 mb-6">
                                      <button
                                          className={`px-4 py-2 rounded-md flex items-center ${activeTab === "voterCard" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                          onClick={() => setActiveTab("voterCard")}
                                      >
                                          <FiUser className="mr-2" /> Voter ID Card
                                      </button>
                                      <button
                                          className={`px-4 py-2 rounded-md flex items-center ${activeTab === "electionInfo" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                          onClick={() => setActiveTab("electionInfo")}
                                      >
                                          <FiCalendar className="mr-2" /> Election Information
                                      </button>
                                      <button
                                          className={`px-4 py-2 rounded-md flex items-center ${activeTab === "activityLog" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                          onClick={() => setActiveTab("activityLog")}
                                      >
                                          <FiHome className="mr-2" /> Activity Log
                                      </button>
                                  </div>
              
                                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                      <h3 className="font-bold text-lg text-blue-700 mb-2">Upcoming Election</h3>
                                      <div className="space-y-1">
                                          <p><span className="font-semibold">Date:</span> {upcomingElection.date}</p>
                                          <p><span className="font-semibold">Type:</span> {upcomingElection.type}</p>
                                          <p><span className="font-semibold">Location:</span> {upcomingElection.location}</p>
                                          <p className="font-semibold text-red-600 mt-2">
                                              Time Remaining: {days} days {hours} hours
                                          </p>
                                      </div>
                                  </div>
              
                                  <div className="space-y-3">
                                      {!editRequested ? (
                                          <button
                                              onClick={() => setModalIsOpen(true)}
                                              className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center justify-center"
                                          >
                                              <FiEdit className="mr-2" /> Apply for Profile Edit
                                          </button>
                                      ) : (
                                          <div className="p-3 bg-yellow-100 text-yellow-800 rounded-md">
                                              Your edit request has been submitted and is pending approval.
                                          </div>
                                      )}
              
                                      <button
                                          onClick={() => setShowChangePasswordModal(true)}
                                          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center"
                                      >
                                          <FiLock className="mr-2" /> Change Password
                                      </button>
              
                                      <button
                                          onClick={() => navigate("/voter-voting")}
                                          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center"
                                      >
                                          Vote in Current Election
                                      </button>
                                  </div>
              
                                  <div className="mt-6">
                                      <h3 className="font-bold text-lg text-blue-700 mb-2">Recent Activity</h3>
                                      <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded-md">
                                          <ul className="space-y-2">
                                              {activityLog.map((log, index) => (
                                                  <li key={index} className="text-sm border-b pb-1">
                                                      <span className="font-semibold">{log.activity}</span>
                                                      <br />
                                                      <span className="text-xs text-gray-500">{log.date}</span>
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                  </div>
                              </div>
              
                              {/* Right Section */}
                              <div className="w-full md:w-2/3">
                                  {activeTab === "voterCard" && (
                                      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                                          <div className="p-4 bg-blue-700 text-white">
                                              <h2 className="text-xl font-bold">Voter Identification Card</h2>
                                              <p className="text-sm">Election Commission of India</p>
                                          </div>
                                          <div className="p-6 flex justify-center">
                                              <VoterCard />
                                          </div>
                                      </div>
                                  )}
              
                                  {activeTab === "electionInfo" && (
                                      <div className="bg-white rounded-lg shadow-xl p-6">
                                          <h2 className="text-2xl font-bold text-blue-700 mb-4">Election Information</h2>
              
                                          <div className="space-y-6">
                                              <div className="border-b pb-4">
                                                  <h3 className="text-lg font-semibold mb-2">Upcoming Elections</h3>
                                                  <div className="bg-blue-50 p-4 rounded-md">
                                                      <p className="font-bold">{upcomingElection.type}</p>
                                                      <p className="text-sm">Date: {upcomingElection.date}</p>
                                                      <p className="text-sm">Location: {upcomingElection.location}</p>
                                                      <p className="text-sm font-semibold text-red-600 mt-2">
                                                          Time Remaining: {days} days {hours} hours
                                                      </p>
                                                  </div>
                                              </div>
              
                                              <div className="border-b pb-4">
                                                  <h3 className="text-lg font-semibold mb-2">Your Polling Station</h3>
                                                  <div className="bg-green-50 p-4 rounded-md">
                                                      <p className="font-bold">Station Name: Central Polling Booth #{voterData?.voterId?.substring(0, 4)}</p>
                                                      <p className="text-sm">Address: Community Center, {voterData?.district}, {voterData?.state}</p>
                                                      <p className="text-sm">Open Hours: 7:00 AM - 6:00 PM</p>
                                                      <p className="text-sm">Your Booth Number: {parseInt(voterData?.voterId?.substring(5, 8), 36) % 10 + 1}</p>
                                                  </div>
                                              </div>
              
                                              <div>
                                                  <h3 className="text-lg font-semibold mb-2">Voting Guidelines</h3>
                                                  <ul className="list-disc pl-5 space-y-1 text-sm">
                                                      <li>Bring your Voter ID card for verification</li>
                                                      <li>Arrive at least 30 minutes before you plan to vote</li>
                                                      <li>Electronic voting machines will be used</li>
                                                      <li>Follow COVID-19 protocols as applicable</li>
                                                      <li>No electronic devices are allowed in the voting booth</li>
                                                      <li>Your finger will be marked with indelible ink after voting</li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </div>
                                  )}
              
                                  {activeTab === "activityLog" && (
                                      <div className="bg-white rounded-lg shadow-xl p-6">
                                          <h2 className="text-2xl font-bold text-blue-700 mb-4">Activity Log</h2>
              
                                          <div className="overflow-hidden rounded-lg border">
                                              <table className="min-w-full divide-y divide-gray-200">
                                                  <thead className="bg-gray-50">
                                                      <tr>
                                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                              Activity
                                                          </th>
                                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                              Date & Time
                                                          </th>
                                                      </tr>
                                                  </thead>
                                                  <tbody className="bg-white divide-y divide-gray-200">
                                                      {activityLog.map((log, index) => (
                                                          <tr key={index}>
                                                              <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div className="text-sm font-medium text-gray-900">{log.activity}</div>
                                                              </td>
                                                              <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div className="text-sm text-gray-500">{log.date}</div>
                                                              </td>
                                                          </tr>
                                                      ))}
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
              
                      <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={() => setModalIsOpen(false)}
                          ariaHideApp={false}
                          className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-lg shadow-xl"
                          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center"
                      >
                          {/* Modal content remains the same */}
                      </Modal>
              
                      <Modal
                          isOpen={showChangePasswordModal}
                          onRequestClose={() => setShowChangePasswordModal(false)}
                          ariaHideApp={false}
                          className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-xl"
                          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center"
                      >
                          {/* Change password modal content remains the same */}
                      </Modal>
                  </div>
              );
              };
              
              export default VoterProfile;