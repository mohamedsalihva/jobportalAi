import User from "../models/User.js";
import Job from "../models/Job.js"
import Application from "../models/Application.js";

export const getAllUsersService = async () => {
    return await User.find().select('-password');
};

export const deleteUserService = async (id) => {
    await User.findByIdAndDelete(id);
};

export const updateUserService = async (id, userData) => {
    delete userData.jobPostedCount;
    delete userData.jobPostedLimit;   

    return await User.findByIdAndUpdate(id, userData, {
        new: true
    }).select('-password');
};


export const getSingleUserService = async (id) => {
    return await User.findById(id).select('-password');
};

export const getAdminAnalyticsService = async () => {
    const totalUsers = await User.countDocuments({
        role: "jobSeeker"
    });
    const totalRecruiters = await User.countDocuments({
        role: "recruiter"
    });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newUserLast7Days = await User.countDocuments({
        createdAt: {
            $gte: sevenDaysAgo
        },
    });

    return {
        totalUsers,
        totalRecruiters,
        totalJobs,
        totalApplications,
        newUserLast7Days
    };
};

export const updateRecruiterLimitService = async (recruiterId, jobPostedLimit) => {
    return await User.findOneAndUpdate(
        { _id: recruiterId, role: "recruiter" }, 
        { jobPostedLimit },
        { new: true }
    ).select("name email jobPostedLimit jobPostedCount");
};
