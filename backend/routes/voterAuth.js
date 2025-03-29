const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Voter = require("../model/Voter");

const router = express.Router();

// Voter Registration
router.post("/register", async (req, res) => {
  try {
    const { fullName, dob, age, gender, fatherHusbandName, voterId, houseNo, street, locality, city, district, state, pinCode, mobile, email, password, aadharNumber, panCardNumber } = req.body;

    if (!fullName || !dob || !age || !gender || !fatherHusbandName || !voterId || !email || !password || !houseNo || !street || !locality || !city || !district || !state || !pinCode || !aadharNumber) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if (age < 18) return res.status(400).json({ message: "Must be at least 18 years old." });

    if (await Voter.findOne({ voterId })) return res.status(400).json({ message: "Voter ID already exists." });

    if (await Voter.findOne({ email })) return res.status(400).json({ message: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newVoter = new Voter({ fullName, dob, age, gender, fatherHusbandName, voterId, houseNo, street, locality, city, district, state, pinCode, mobile, email, password: hashedPassword, aadharNumber, panCardNumber });

    await newVoter.save();
    res.status(201).json({ message: "Voter registered successfully." });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Voter Login
router.post("/login", async (req, res) => {
  try {
    const { voterId, password } = req.body;

    if (!voterId || !password) return res.status(400).json({ message: "Voter ID and password are required." });

    const voter = await Voter.findOne({ voterId: voterId.trim() });
    if (!voter || !(await bcrypt.compare(password.trim(), voter.password))) {
      return res.status(401).json({ message: "Invalid voter ID or password." });
    }

    const token = jwt.sign({ id: voter._id, role: "voter", name: voter.fullName }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });

    res.status(200).json({ message: "Login successful", token, voter: { name: voter.fullName, voterId: voter.voterId } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
