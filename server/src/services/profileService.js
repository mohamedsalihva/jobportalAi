import User from "../models/User.js";

export const getMyProfileService = async (userId) =>{
    return await User.findById(userId).select(
         "name email role phone location headline summary skills resumeUrl experience achievements education certifications"
    );
};


export const updateMyProfileService = async (userId, data) =>{
    return await User.findByIdAndUpdate(userId, {$set:data},{new: true}).select(
         "name email role phone location headline summary skills resumeUrl experience achievements education certifications"
    );
};