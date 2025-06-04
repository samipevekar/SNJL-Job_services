import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  jobName: { type: String, required: true },
  image: { type: String, required:true, default: null }
}, { timestamps: true });

export default model("Job", jobSchema);
