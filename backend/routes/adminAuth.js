const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
const User = require("../model/Admin"); // Change to your User model path
const adminAuth = require("../middlewares/adminAuth"); // Import authentication middleware
require("dotenv").config();

const router = express.Router();

// 🔹 Rate limiter middleware (prevents brute force attacks)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Allow only 5 login attempts per 15 mins
    message: "Too many login attempts. Try again later.",
});

// ✅ User Registration Route (for Admin or Voter)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, city, telephone, role } = req.body;   // Role is included here (admin, voter, etc.)

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists." });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with role (either admin or voter)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            city,
            telephone,
            role // Store role in the database (admin, voter, etc.)
        });

        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// ✅ User Login Route with Rate Limiting & Secure JWT Storage
router.post("/login", loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔹 Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found for email:", email);
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 🔹 Compare Passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Password mismatch");
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 🔹 Generate JWT Token with user role
        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET is not defined in .env file");
            return res.status(500).json({ success: false, message: "JWT_SECRET is missing" });
        }

        // We store the user role in the JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 🔹 Set JWT as HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,   // Prevents XSS
            secure: process.env.NODE_ENV === "production", // Only for HTTPS
            sameSite: "Strict", // Prevent CSRF attacks
            maxAge: 3600000, // 1 hour
        });

        console.log("✅ Login successful for:", email);

        // Send the user role and other details in the response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token, // ✅ Include the token in the response
            role: user.role, // Send the role back in the response (admin, voter, etc.)
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                city: user.city,
                telephone: user.telephone,
                role: user.role // Include the role in the response
            }
        });

    } catch (error) {
        console.error("❌ Server error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// ✅ User Logout Route (Clears JWT Token)
router.post("/logout", (req, res) => {
    res.clearCookie("token"); // Remove JWT from cookies
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

// ✅ Protected User Dashboard Route
router.get("/user-dashboard", adminAuth, (req, res) => {
    // The req.user object contains the authenticated user (can be admin, voter, etc.)
    res.json({
        success: true,
        message: `Welcome ${req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1)}!`, // Display role dynamically
        user: req.user,   // Send back the full user data
        role: req.user.role,   // Include the role (admin, voter, etc.)
    });
});

module.exports = router;