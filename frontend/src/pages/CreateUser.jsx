import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    dob: "",
    gender: "Male",
    fatherHusbandName: "",
    voterId: "",
    houseNo: "",
    street: "",
    locality: "",
    city: "",
    district: "",
    state: "",
    pinCode: "",
    mobile: "",
    email: "",
    password: "",
    aadharNumber: "",
    panCardNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate Age
  const calculateAge = (dob) => {
    if (!dob) return 0; // Handle cases where DOB is not yet selected
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }
    return age;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!userData.fullName || !userData.voterId || !userData.email || !userData.password) {
      setError("Full Name, Voter ID, Email, and Password are required.");
      setLoading(false);
      return;
    }

    const age = calculateAge(userData.dob);
    if (age < 18) {
      setError("You must be at least 18 years old to register.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/voters/register",
        { ...userData, age },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setSuccessMessage("User created successfully!");
        setTimeout(() => navigate("/admin/dashboard"), 2000);
      } else {
        throw new Error(response.data.message || "Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.response?.data?.message || "Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Voter ID</h2>
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input type="text" name="fullName" placeholder="Full Name" value={userData.fullName} onChange={handleChange} required className="p-2 border rounded" />
        <input type="date" name="dob" value={userData.dob} onChange={handleChange} required className="p-2 border rounded" />
        <select name="gender" value={userData.gender} onChange={handleChange} required className="p-2 border rounded">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="fatherHusbandName" placeholder="Father/Husband Name" value={userData.fatherHusbandName} onChange={handleChange} required className="p-2 border rounded" />
        <input type="text" name="voterId" placeholder="Voter ID" value={userData.voterId} onChange={handleChange} required className="p-2 border rounded" />

        {/* Address Details */}
        <input type="text" name="houseNo" placeholder="House Number" value={userData.houseNo} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="street" placeholder="Street" value={userData.street} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="locality" placeholder="Locality" value={userData.locality} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="city" placeholder="City" value={userData.city} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="district" placeholder="District" value={userData.district} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="state" placeholder="State" value={userData.state} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="pinCode" placeholder="Pin Code" value={userData.pinCode} onChange={handleChange} className="p-2 border rounded" />

        {/* Contact & Identity Details */}
        <input type="text" name="mobile" placeholder="Mobile Number" value={userData.mobile} onChange={handleChange} className="p-2 border rounded" />
        <input type="email" name="email" placeholder="Email Address" value={userData.email} onChange={handleChange} required className="p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required className="p-2 border rounded" />
        <input type="text" name="aadharNumber" placeholder="Aadhar Number" value={userData.aadharNumber} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="panCardNumber" placeholder="PAN Card Number" value={userData.panCardNumber} onChange={handleChange} className="p-2 border rounded" />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;