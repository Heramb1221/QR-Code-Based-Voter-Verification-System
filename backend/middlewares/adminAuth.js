const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  let token = req.cookies.token || req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized. Admins only." });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = adminAuth;
