import Application from "../models/Application.js";

export const createApplicationService = async (data) => {
  return await Application.create(data);
};

export const getApplicationByJobAndUserService = async (jobId, userId) => {
  return await Application.findOne({ job: jobId, applicant: userId });
};

export const getMyApplicationService = async (userId) => {
  return await Application.find({ applicant: userId })
    .populate("job")
    .sort({ createdAt: -1 });
};
