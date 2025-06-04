import Job from "../models/Job"

export const createJob = async (req,res) => {
    const { jobName } = req.body

    try {
        const job = Job.create({jobName})

        res.status(200).json({message:"Job created successfully", job})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}