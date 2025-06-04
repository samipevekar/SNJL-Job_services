import Job from "../models/Job.js"

export const createJob = async (req,res) => {
    const { jobName, image } = req.body

    try {

        if(!jobName || !image){
            re
        }

        const job = await Job.create({jobName,image})

        res.status(200).json({message:"Job created successfully",job})

    } catch (error) {
        res.status(500).json({error:error.message})
        console.log('error in createJob controller', error)
    }
}