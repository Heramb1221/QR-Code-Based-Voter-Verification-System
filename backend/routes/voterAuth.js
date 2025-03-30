const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Voter = require("../model/Voter");

dotenv.config();
const router = express.Router();

// ✅ Voter Registration (Without bcrypt)
router.post("/register", async (req, res) => {
  try {
    const { fullName, voterId, email, password } = req.body;

    if (await Voter.findOne({ voterId })) return res.status(400).json({ message: "Voter ID already exists." });
    if (await Voter.findOne({ email })) return res.status(400).json({ message: "Email already in use." });

    // ⚠️ Storing plain text password (NOT recommended for real-world apps)
    const newVoter = new Voter({ fullName, voterId, email, password });
    await newVoter.save();

    res.status(201).json({ message: "Voter registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Voter Login (Without bcrypt)
router.post("/login", async (req, res) => {
  try {
    const { voterId, password } = req.body;

    const voter = await Voter.findOne({ voterId });
    if (!voter) return res.status(401).json({ message: "Invalid voter ID or password." });

    // ⚠️ Directly comparing plain text password
    if (voter.password !== password) return res.status(401).json({ message: "Invalid voter ID or password." });

    const token = jwt.sign(
      { id: voter._id, role: "voter", name: voter.fullName },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      voter: {
        name: voter.fullName, // Explicitly use name instead of fullName in the response
        voterId: voter.voterId
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;