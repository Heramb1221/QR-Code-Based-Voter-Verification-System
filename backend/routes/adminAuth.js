const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
const User = require("../model/Admin");
const adminAuth = require("../middlewares/adminAuth");
require("dotenv").config();

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Try again later.",
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, city, telephone, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists." });
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

router.post("/login", loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in .env file");
            return res.status(500).json({ success: false, message: "JWT_SECRET is missing" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
        });

        console.log("Login successful for:", email);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
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
        console.error("Server error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

router.get("/user-dashboard", adminAuth, (req, res) => {
    res.json({
        success: true,
        message: `Welcome ${req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1)}!`,
        user: req.user,
        role: req.user.role,
    });
});

module.exports = router;