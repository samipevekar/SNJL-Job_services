import Job from "../models/Job"

export const createJob = async (req,res) => {
    const { jobName } = req.body

    try {
        const job = Job.create({jobName})

        res.status(200).json()

    } catch (error) {
        
    }
}