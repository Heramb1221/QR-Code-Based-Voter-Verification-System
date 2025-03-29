const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    telephone: { type: String, required: true },
    officerId: { type: String, required: true, unique: true },
    officeAddress: { type: String, required: true },
    role: {
        type: String,
        required: true,
        default: "admin",
        enum: ["admin"], // Ensures only "admin" role
    }
}, { timestamps: true });

// 🔹 Hash password before saving
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔹 Method to compare passwords during login
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
