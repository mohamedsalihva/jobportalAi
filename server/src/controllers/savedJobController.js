import {saveJobService,unsaveJobService,getSavedJobsService} from "../services/savedJobService.js";

export const savedJobController = async(req,res)=>{
    try {
        const userId = req.user._id;
        const {jobId} = req.params;

        await saveJobService(userId,jobId);

        res.json({ success : true, message: "job saved"});
    } catch (error) {
        res.status(400).json({success :false, message:error.message});
    }
};


export const unsaveJobController = async (req,res) =>{
    try {
        const userId = req.user._id;
        const {jobId} = req.params;

        await  unsaveJobService(userId, jobId);
        res.json({success: true, message: "job removed"});
    } catch (error) {
        res.status(400).json({success : false,message: error.message});
    }
};


export const mySavedJobsController = async (req,res)=>{
         try {
            const userId = req.user._id;
            const savedJobs = await getSavedJobsService(userId);
            res.json({success: true, savedJobs});
         } catch (error) {
            res.status(500).json({success:false, message:error.message});         }
}