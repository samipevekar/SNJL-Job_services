// models/User.js
import mongoose, { Schema, model } from "mongoose";

const postedJobSchema = new Schema({
  user: { type: mongoose.Types.ObjectId },
  jobName: { type: String, required: true },
  jobStatus: { type: String, required: true, default: "pending", enum:["pending","completed","rejected"]},

}, { timestamps: true });

export default model("PostedJob", postedJobSchema);
