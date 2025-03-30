const express = require("express");
const jwt = require("jsonwebtoken");
const Voter = require("../model/Voter");

const router = express.Router();

// Other routes remain the same...

// Updated Voter Login Route - WITHOUT bcrypt
router.post("/login", async (req, res) => {
  try {
    const { voterId, password } = req.body;
    
    console.log("Login attempt with voterId:", voterId);

    if (!voterId || !password) {
      return res.status(400).json({ message: "Voter ID and password are required." });
    }

    const voter = await Voter.findOne({ voterId: voterId.trim() });
    console.log("Voter found:", voter ? "Yes" : "No");

    if (!voter) {
      return res.status(401).json({ message: "Invalid voter ID or password." });
    }

    // Direct password comparison (without bcrypt)
    const isMatch = (password.trim() === voter.password);
    console.log("Password match:", isMatch ? "Yes" : "No");
    console.log("Provided password:", password.trim());
    console.log("Stored password:", voter.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid voter ID or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: voter._id, role: "voter", name: voter.fullName }, 
      process.env.JWT_SECRET, 
      { expiresIn: "2h" }
    );

    // Set secure cookie with JWT token
    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict",
      maxAge: 7200000 // 2 hours in milliseconds
    });

    console.log("Login successful for voter:", voter.fullName);
    
    res.status(200).json({ 
      message: "Login successful", 
      token, 
      voter: { 
        name: voter.fullName, 
        voterId: voter.voterId 
      } 
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;