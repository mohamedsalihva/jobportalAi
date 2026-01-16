import User from "../models/User.js";

export const saveJobService = async (userId, jobId)=>{
    const user = await User.findById(userId);

    const alreadySaved = user.savedJobs.some((id)=> id.toString() === jobId);
    if(alreadySaved){
        throw new Error("job already saved");
    }

    user.savedJobs.push(jobId);
    return await user.save();
};


export const unsaveJobService = async (userId,jobId)=>{
    const user = await User.findById(userId);

if (!user) {
  throw new Error("User not found");
}


    user.savedJobs =user.savedJobs.filter((id) => id.toString() !== jobId);
    return await user.save();
};


export const getSavedJobsService = async (userId) =>{
    const user = await User.findById(userId).populate('savedJobs');
    return user.savedJobs;
}