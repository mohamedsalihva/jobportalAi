import Job from "../models/Job.js";
import Recruiter from "../models/Recruiter.js";   

import {
  getAllJobService,
  getSingleJobService,
  updateJobService,
  deleteJobService
} from "../services/JobService.js";



export const createJobController = async (req, res) => {
  try {
    const recruiterProfile = await Recruiter.findOne({ user: req.user._id });

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const job = await Job.create({
      ...req.body,
      recruiter: recruiterProfile._id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created",
      job,
    });
  } catch (error) {
    console.log("createJobController error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAllJobController = async (req, res) => {
  const products = await getAllJobService();
  res.status(200).json({
    success: true,
    data: products,
    message: "jobs retrieved successfully"
  });
};



export const getSingleJobController = async (req, res) => {
  const product = await getSingleJobService(req.params.id);
  res.status(200).json({
    success: true,
    data: product,
    message: "job retrieved successfully"
  });
};



export const updateJobController = async (req, res) => {
  const product = await updateJobService(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data: product,
    message: "job updated successfully"
  });
};

export const deleteJobController = async (req, res) => {
  await deleteJobService(req.params.id);
  res.status(200).json({
    success: true,
    message: "job deleted successfully"
  });
};



export const getMyJobsController = async (req, res) => {
  try {
    const recruiterProfile = await Recruiter.findOne({ user: req.user._id });

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const jobs = await Job.find({ recruiter: recruiterProfile._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("getMyJobsController error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};