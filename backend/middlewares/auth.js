const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

  const authHeader = req.header("Authorization");
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id || decoded._id || decoded.userId
    };
    console.log("Authenticated user ID:", req.user.id);
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};