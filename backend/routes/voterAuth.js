const express = require("express");
const jwt = require("jsonwebtoken");
const Voter = require("../model/Voter");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const {
            fullName,
            dob,
            gender,
            fatherHusbandName,
            voterId,
            houseNo,
            street,
            locality,
            city,
            district,
            state,
            pinCode,
            mobile,
            email,
            password,
            aadharNumber,
            panCardNumber
        } = req.body;

        if (!fullName || !email || !password || !voterId) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        let voter = await Voter.findOne({ email });
        if (voter) {
            return res.status(400).json({ message: "Voter with this email already exists" });
        }

        voter = await Voter.findOne({ voterId });
        if (voter) {
            return res.status(400).json({ message: "Voter with this Voter ID already exists" });
        }

        voter = new Voter({
            fullName,
            dob,
            gender,
            fatherHusbandName,
            voterId,
            houseNo,
            street,
            locality,
            city,
            district,
            state,
            pinCode,
            mobile,
            email,
            password,
            aadharNumber,
            panCardNumber,
            hasVoted: false
        });

        await voter.save();

        const payload = {
            id: voter._id
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) throw err;

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.status(201).json({
                    success: true,
                    token,
                    voter: {
                        id: voter._id,
                        name: voter.fullName,
                        email: voter.email
                    }
                });
            }
        );
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

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

        const isMatch = (password.trim() === voter.password);
        console.log("Password match:", isMatch ? "Yes" : "No");
        console.log("Provided password:", password.trim());
        console.log("Stored password:", voter.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid voter ID or password." });
        }

        const token = jwt.sign(
            { id: voter._id, role: "voter", name: voter.fullName },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7200000
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

router.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const voter = await Voter.findById(decoded.id).select('-password');

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    res.json(voter);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:voterId/vote", async (req, res) => {
    try {
      const { voterId } = req.params;
      const voter = await Voter.findOneAndUpdate({ voterId }, { hasVoted: true }, { new: true });
      if (!voter) return res.status(404).json({ message: "Voter not found" });
      res.json({ message: "Voter marked as voted", voter });
    } catch (error) {
      console.error("Vote update error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  router.get("/:voterId", async (req, res) => {
    try {
      const { voterId } = req.params;
      const voter = await Voter.findOne({ voterId }).select("-password");
      if (!voter) return res.status(404).json({ message: "Voter not found" });
      res.json(voter);
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

module.exports = router;