const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        dob: {
            type: Date,
            required: true
        },
        age: {
            type: Number
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        },
        fatherHusbandName: {
            type: String,
            required: true,
            trim: true
        },
        voterId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        houseNo: {
            type: String,
            trim: true
        },
        street: {
            type: String,
            trim: true
        },
        locality: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        district: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        pinCode: {
            type: String,
            required: true,
            trim: true
        },
        mobile: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        aadharNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        panCardNumber: {
            type: String,
            trim: true
        },
        photoUrl: {
            type: String,
            trim: true
        },
        hasVoted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Calculate age based on DOB
VoterSchema.pre("save", function (next) {
    if (this.dob) {
        const today = new Date();
        const birthDate = new Date(this.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        this.age = age;
    }
    next();
});

module.exports = mongoose.model("Voter", VoterSchema);