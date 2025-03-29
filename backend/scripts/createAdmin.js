require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const Admin = require("../model/Admin");

console.log("🔍 Loaded MongoDB URI:", process.env.MONGODB_URI);

// Ensure MONGO_URI is properly loaded
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error("❌ MongoDB URI is undefined. Check your .env file.");
    process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

const createAdmin = async () => {
  try {
    const adminData = {
      name: "Heramb Chaudhari",
      email: "hchaudhari1221@gmail.com",
      password: "QRVOTIFY@123",
      city: "Mumbai",
      telephone: "9876543210",
      officerId: "OFFICER-001",
      officeAddress: "123, Admin Street, Mumbai",
      role: "admin",
    };

    // 🔹 Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists.");
      return;
    }

    // 🔹 Create new admin (password will be hashed automatically)
    const newAdmin = new Admin(adminData);
    await newAdmin.save();

    console.log("✅ Admin account created successfully.");

  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();