const jwt = require("jsonwebtoken");

const voterAuth = (req, res, next) => {
  try {
    let token = req.cookies?.token || req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "voter") {
      return res.status(403).json({ message: "Unauthorized. Voter access only." });
    }

    req.voter = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = voterAuth;