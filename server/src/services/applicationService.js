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

export const getApplicantsByJobService = async (jobId) => {
  return await Application.find({ job: jobId })
    .populate("applicant", "name email")
    .sort({ createdAt: -1 });
};

export const updateApplicationStatusService = async (applicationId, status) => {
  return await Application.findByIdAndUpdate(
    applicationId,
    { status },
    { new: true }
  ).populate("applicant", "name email");
};
