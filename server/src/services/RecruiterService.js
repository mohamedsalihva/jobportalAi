import Recruiter from "../models/Recruiter.js";

export const createRecruiterService = async (data) => {
  return await Recruiter.create(data);
};


export const getRecruiterByUserService = async (userId) => {
  return await Recruiter.findOne({ user: userId })
    .populate("user", "name email role");
};


export const updateRecruiterService = async (recruiterId, data) => {
  return await Recruiter.findByIdAndUpdate(
    recruiterId,
    data,
    { new: true }
  );
};
