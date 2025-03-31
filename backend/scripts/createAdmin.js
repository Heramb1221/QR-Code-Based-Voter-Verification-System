require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const Admin = require("../model/Admin");

console.log("Loaded MongoDB URI:", process.env.MONGODB_URI);

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error("MongoDB URI is undefined. Check your .env file.");
    process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

const createAdmin = async () => {
  try {
    const adminData = {
      name: "Sujal Bhoi",
      email: "Bhoisujal@gmail.com",
      password: "QRVOTIFY@123",
      city: "Chennai",
      telephone: "8954235462",
      officerId: "OFFICER-004",
      officeAddress: "101112, Admin Street, Chennai",
      role: "admin",
    };

    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const newAdmin = new Admin(adminData);
    await newAdmin.save();

    console.log("Admin account created successfully.");

  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();