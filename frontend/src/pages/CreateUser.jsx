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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateAge = (dob) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const age = calculateAge(userData.dob);
      if (age < 18) {
        setError("You must be at least 18 years old to register.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/voters/register",
        { ...userData, age },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.status === 201) {
        alert("User created successfully!");
        navigate("/admin-dashboard");
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="p-2 border" />
        <input type="date" name="dob" onChange={handleChange} required className="p-2 border" />
        <select name="gender" onChange={handleChange} required className="p-2 border">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input type="text" name="fatherHusbandName" placeholder="Father/Husband Name" onChange={handleChange} required className="p-2 border" />
        <input type="text" name="voterId" placeholder="Voter ID" onChange={handleChange} required className="p-2 border" />

        {/* Address Details */}
        <input type="text" name="houseNo" placeholder="House Number" onChange={handleChange} required className="p-2 border" />
        <input type="text" name="street" placeholder="Street" onChange={handleChange} required className="p-2 border" />
        <input type="text" name="locality" placeholder="Locality" onChange={handleChange} required className="p-2 border" />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required className="p-2 border" />
        <input type="text" name="district" placeholder="District" onChange={handleChange} required className="p-2 border" />
        <input type="text" name="state" placeholder="State" onChange={handleChange} required className="p-2 border" />
        <input type="text" name="pinCode" placeholder="Pin Code" onChange={handleChange} required className="p-2 border" />

        {/* Contact & Identity Details */}
        <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required className="p-2 border" />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="p-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="p-2 border" />
        <input type="text" name="aadharNumber" placeholder="Aadhar Number" onChange={handleChange} required className="p-2 border" />
        <input type="text" name="panCardNumber" placeholder="PAN Card Number" onChange={handleChange} required className="p-2 border" />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
