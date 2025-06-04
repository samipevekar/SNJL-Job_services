// models/User.js
import { Schema, model } from "mongoose";

const postedJobSchema = new Schema({
  jobName: { type: String, required: true },
  jobstatus:
}, { timestamps: true });

export default model("PostedJob", postedJobSchema);
