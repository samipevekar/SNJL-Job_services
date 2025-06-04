// models/User.js
import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["recruiter", "admin"], default: "recruiter" },
  address: { type: String, default: "" }
}, { timestamps: true });

export default model("User", userSchema);
