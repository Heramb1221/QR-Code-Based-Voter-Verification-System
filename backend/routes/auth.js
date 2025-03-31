const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Voter = require("../model/Voter");

router.get("/profile", auth, async (req, res) => {
  try {
    console.log("Fetching profile for user ID:", req.user.id);

    const voter = await Voter.findById(req.user.id).select("-password");

    if (!voter) {
      console.log("No voter found with ID:", req.user.id);
      return res.status(404).json({ message: "Voter not found" });
    }

    console.log("Voter found:", voter.fullName);
    res.json(voter);
  } catch (error) {
    console.error("Error fetching voter profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;