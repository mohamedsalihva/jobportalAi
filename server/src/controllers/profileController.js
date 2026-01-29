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

export const uploadResumeController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume required" });
    }

    const user = await User.findById(req.user._id);

    user.resumePath = req.file.path.replace(/\\/g, "/"); // windows fix
    await user.save();

    res.json({
      success: true,
      resumePath: user.resumePath,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
