import Job from "../models/Job.js"

export const createJob = async (req,res) => {
    const { jobName } = req.body

    try {
        Job.create({jobName})

        res.status(200).json({message:"Job created successfully"})

    } catch (error) {
        res.status(500).json({error:error.message})
        console.log('error in createJob controller', error)
    }
}