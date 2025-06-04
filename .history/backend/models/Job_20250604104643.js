import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  jobName: { type: String, required: true, trim: true },
  image: { type: String, required:true, default: '' }
}, { timestamps: true });

export default model("Job", jobSchema);
