import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "", captchaVerified: false });
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

        if (!formData.email || !formData.password) {
            setErrors((prev) => ({
                ...prev,
                email: !formData.email ? "Email is required" : null,
                password: !formData.password ? "Password is required" : null,
            }));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
                credentials: "include", // ✅ Sends cookies/sessions
            });

            const data = await response.json();
            console.log("📢 Response Data:", data);

            if (response.ok) {
                console.log("✅ Admin login successful, storing user data and redirecting...");
                localStorage.setItem('token', data.token); // Assuming token is sent in response
                localStorage.setItem('userType', data.role); // Store the role
                localStorage.setItem('userName', data.user.name); // Store the user name
                navigate("/admin-dashboard");
            } else {
                setErrors({ general: data.message || "Invalid credentials" });
            }
        } catch (error) {
            console.error("❌ Fetch error:", error);
            setErrors({ general: "Failed to connect to server" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Admin Login</h2>

                {errors.general && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                        <FiAlertCircle className="mr-2" />
                        <span>{errors.general}</span>
                    </div>
                )}

                <form className="space-y-4" onSubmit={loginHandler}>
                    <div className="relative">
                        <FiMail className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
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

export default AdminLogin;