// controllers/jobController.js
import PostedJob from "../models/PostedJob.js";

// 1. Post a new job (Recruiter)
export const postJob = async (req, res) => {
  try {
    const { jobName, jobAddress, jobDescription } = req.body;

    const newJob = await PostedJob.create({
      user: req.user.id, // recruiter ID from auth middleware
      jobName,
      jobAddress,
      jobDescription
    });

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: "Job posting failed", error: error.message });
  }
};

// 2. Edit job status (Admin only)
export const editPostedJob = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success:false, error: "Only admin can update job status or phone" });
    }

    console.log('edit job')

    const { id } = req.params;
    const { jobStatus, phone } = req.body;

    const updateFields = {};

    if (jobStatus) {
      if (!["pending", "completed", "rejected"].includes(jobStatus)) {
        return res.status(400).json({ success:false, error: "Invalid status" });
      }
      updateFields.jobStatus = jobStatus;
    }

    if (phone) {
      updateFields.phone = phone;
    }

    const updatedJob = await PostedJob.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ success:false, error: "Job not found" });
    }

    res.json({ message: "Job updated", job: updatedJob });
  } catch (error) {
    res.status(500).json({ error: "Update failed", error: error.message });
  }
};


// 3. Get all jobs by the logged-in recruiter
export const getRecruiterPostedJobs = async (req, res) => {
  try {
    const jobs = await PostedJob.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs", error: error.message });
  }
};

// 4. Get all jobs with status filter
export const getAllPostedJobs = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { jobStatus: status } : {};

    const jobs = await PostedJob.find(filter).populate("user", "name email phone").sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};
