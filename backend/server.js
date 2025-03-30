// server.js (Combined and adjusted for consistency)

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Import route files
const voterRoutes = require('./routes/voterAuth'); // Assuming this handles voter authentication and profile
const adminRoutes = require('./routes/adminAuth');   // Assuming this handles admin authentication

const app = express();
const PORT = process.env.PORT || 5000;

// Define allowed origins for CORS
const allowedOrigins = [
    'http://localhost:3000', // Your React app URL (adjust if different)
    'http://localhost:5173'  // Another potential React app URL (adjust if not needed)
];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true // Important for cookies and session management
}));

// Session middleware (configure as needed)
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-fallback-secret-key', // Use a strong, unique secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true in production over HTTPS
        httpOnly: true,
        sameSite: 'lax', // Or 'strict' depending on your needs
        maxAge: 3600000, // Example: 1 hour session duration (in milliseconds)
    }
}));

// Routes
app.use('/api/voters', voterRoutes);
app.use('/api/admin', adminRoutes);
// Add other routes here if you have them

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});