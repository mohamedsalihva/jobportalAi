import Recruiter from "../models/Recruiter.js";   

import {
  createJobService,
  getAllJobService,
  getSingleJobService,
  updateJobService,
  deleteJobService
} from "../services/JobService.js";



export const createJobController = async (req, res) => {
  try {
    
    const recruiter = await Recruiter.findOne({ user: req.user._id });

    if (!recruiter) {
      return res.status(403).json({
        success: false,
        message: "Recruiter profile not found"
      });
    }

    
    const job = await createJobService({
      ...req.body,
      recruiter: recruiter._id   
    });

    res.status(201).json({
      success: true,
      data: job,
      message: "Job created successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
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
