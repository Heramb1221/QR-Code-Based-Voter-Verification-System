import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { AuthContext2 as AuthContext } from "../context/authVoter"; // Fixed import to use voter auth context

const VoterLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    voterId: "",
    password: "",
    captchaVerified: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleCaptcha = (value) => {
    setFormData((prev) => ({ ...prev, captchaVerified: !!value }));
    if (errors.captcha) setErrors((prev) => ({ ...prev, captcha: null }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!formData.captchaVerified) {
      setErrors((prev) => ({ ...prev, captcha: "Please complete the CAPTCHA" }));
      setLoading(false);
      return;
    }

    if (!formData.voterId || !formData.password) {
      setErrors({
        voterId: !formData.voterId ? "Voter ID is required" : null,
        password: !formData.password ? "Password is required" : null,
      });
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting login with:", { voterId: formData.voterId });
      const response = await fetch("http://127.0.0.1:5000/api/voters/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterId: formData.voterId, password: formData.password }),
        credentials: "include",
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await response.json();
      console.log("✅ Voter login successful:", data);

      // Store important data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", "voter");
      localStorage.setItem("userName", data.voter.name);
      localStorage.setItem("voterId", data.voter.voterId); // Added voterId to localStorage

      // Pass data to the auth context
      login(data);
      navigate("/voter-dashboard");
    } catch (error) {
      console.error("❌ Fetch error:", error.message);
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Voter Login</h2>
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <FiAlertCircle className="mr-2" />
            <span>{errors.general}</span>
          </div>
        )}
        <form className="space-y-4" onSubmit={loginHandler}>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="voterId"
              placeholder="Enter Voter ID"
              value={formData.voterId}
              className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            {errors.voterId && <p className="text-red-600 text-sm">{errors.voterId}</p>}
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>
          <ReCAPTCHA sitekey="6LcBIvQqAAAAAFEUBmPlWHp5qbObCUsyKlnbVCut" onChange={handleCaptcha} />
          {errors.captcha && <p className="text-red-600 text-sm">{errors.captcha}</p>}
          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoterLogin;