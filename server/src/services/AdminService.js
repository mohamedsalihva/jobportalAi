import User from "../models/User.js";

export const getAllUsersService = async()=>{
    return await User.find().select('-password');
};

export const deleteUserService = async(id)=>{
    await User.findByIdAndDelete(id);
};

export const updateUserService = async(id, userData)=>{
    delete userData.jobPostedCount;
    return await User.findByIdAndUpdate(id, userData, {new: true}).select('-password');
};

export const getSingleUserService =async(id)=>{
    return await User.findById(id).select('-password');
};

