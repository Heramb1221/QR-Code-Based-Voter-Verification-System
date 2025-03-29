require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed Frontend Origin
const allowedOrigins = ["http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // ✅ Allow credentials (cookies, sessions)
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, sameSite: "lax" }
}));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error: ", err));

// ✅ Import Routes
const adminAuth = require("./routes/adminAuth");
app.use("/api/admin", adminAuth);

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
