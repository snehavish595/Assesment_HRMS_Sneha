const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true,unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["HR", "EMPLOYEE"], default: "EMPLOYEE" },
    doj: { type: Date },
    manager: { type: String },
    dept: { type: String },
    proj: { type: String },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
