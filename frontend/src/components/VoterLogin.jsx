import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { AuthContext2 } from "../context/authVoter";

const VoterLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext2);

  const [formData, setFormData] = useState({
    voterId: "",
    password: "",
    captchaVerified: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fix: Ensure `e.target` exists before destructuring
  const handleChange = (e) => {
    if (!e.target) return; // Prevents undefined errors
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null })); // Clears error for current field
  };

  const handleCaptcha = (value) => {
    setFormData((prev) => ({ ...prev, captchaVerified: !!value }));
    setErrors((prev) => ({ ...prev, captcha: null }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const { voterId, password, captchaVerified } = formData;

    if (!captchaVerified) {
      setErrors((prev) => ({ ...prev, captcha: "Please complete the CAPTCHA" }));
      setLoading(false);
      return;
    }

    if (!voterId || !password) {
      setErrors({
        voterId: !voterId ? "Voter ID is required" : null,
        password: !password ? "Password is required" : null,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/voters/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterId, password }),
      });

      // ✅ Fix: Handle empty response safely
      const data = await response.json().catch(() => null);

      if (!data || !response.ok) {
        throw new Error(data?.message || "Invalid credentials");
      }

      console.log("✅ Voter login successful:", data);

      // ✅ Fix: Make sure voter object and required properties exist
      if (!data.voter || !data.token) {
        throw new Error("Invalid server response");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", "voter");
      
      // ✅ Fix: Pass the data to login function with proper error handling
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