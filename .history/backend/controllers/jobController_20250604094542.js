import Job from "../models/Job.js"

export const createJob = async (req,res) => {
    const { jobName, image } = req.body

    try {

        if(!jobName || !image){
            return res.status(400).json({success:false, error: "Job name and image are required"})
        }

        const job = await Job.create({jobName,image})

        res.status(200).json({message:"Job created successfully",job})

    } catch (error) {
        res.status(500).json({error:error.message})
        console.log('error in createJob controller', error)
    }
}

export const getAllJobs = async(req,res) => {
    try {
        const jobs = await Job.find({})
        res.status(200).json()
        
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log('error in getAllJobs controller', error)
    }
}