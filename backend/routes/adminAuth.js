const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
const User = require("../model/Admin");
const adminAuth = require("../middlewares/adminAuth");
require("dotenv").config();

const router = express.Router();

// Rate limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Try again later.",
});

// ✅ Admin Registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, city, telephone, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            city,
            telephone,
            role
        });

        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// ✅ Admin Login
router.post("/login", loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            role: user.role,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                city: user.city,
                telephone: user.telephone,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// ✅ Logout
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

// ✅ Admin Stats
router.get("/stats", adminAuth, async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const testimonialsCount = 10; // Replace with actual testimonial count logic
        const feedbacksCount = 5; // Replace with actual feedback count logic

        res.json({
            users: usersCount,
            testimonials: testimonialsCount,
            feedbacks: feedbacksCount
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching stats", error: error.message });
    }
});

// ✅ Admin Profile
router.get("/profile", adminAuth, async (req, res) => {
    try {
        const admin = await User.findById(req.user.id).select("-password");
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        res.json({
            name: admin.name,
            id: admin._id,
            phone: admin.telephone,
            location: admin.city
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching profile", error: error.message });
    }
});

module.exports = router;
