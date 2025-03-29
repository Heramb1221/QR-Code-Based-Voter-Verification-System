const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const VoterSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  fatherHusbandName: { type: String, required: true },
  voterId: { type: String, required: true, unique: true },
  houseNo: { type: String, required: true },
  street: { type: String, required: true },
  locality: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  aadharNumber: { type: String, required: true },
  panCardNumber: { type: String },
  hasVoted: { type: Boolean, default: false }
}, { timestamps: true });

VoterSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("Voter", VoterSchema);
