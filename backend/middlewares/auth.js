const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  // Get token from header
  const authHeader = req.header("Authorization");
  let token;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract token from "Bearer "
    token = authHeader.substring(7);
  } else {
    // Try to get token from cookies
    token = req.cookies.token;
  }

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload to request
    // Make sure we use the correct property from the token
    req.user = {
      id: decoded.id || decoded._id || decoded.userId // Handle different possible ID formats
    };
    
    console.log("Authenticated user ID:", req.user.id); // Debug logging
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};