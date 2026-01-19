import User from "../models/User.js";
import { getMyProfileService,updateMyProfileService } from "../services/profileService.js";

export const getMyProfileController = async (req,res) =>{
try {
    const profile = await  getMyProfileService(req.user._id);
    res.json({
        success:true,
        profile: profile,
    });
} catch (error) {
    res.status(500).json({success:false, message:error.message});
}
};

export const updateMyProfileController = async (req,res)=>{
    try {
        const updateProfile = await updateMyProfileService(req.user._id,req.body);
        res.json({
            success:true,
            message:"profile updated successfully",
            profile:updateProfile,
        })
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
}