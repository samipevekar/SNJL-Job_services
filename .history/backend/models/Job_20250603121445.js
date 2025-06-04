import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  jobName: { type: String, required: true },
  i
}, { timestamps: true });

export default model("Job", jobSchema);
