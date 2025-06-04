// models/User.js
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  jobName: { type: String, required: true },
}, { timestamps: true });

export default model("Job", userSchema);
