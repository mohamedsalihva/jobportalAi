import fs from "fs";
import path from "path";
import { SERVER_ROOT } from "../utils/paths.js";

import Job from "../models/Job.js";
import Recruiter from "../models/Recruiter.js";
import User from "../models/User.js";
import Application from "../models/Application.js";

import {
  createApplicationService,
  getApplicationByJobAndUserService,
  getMyApplicationService,
  getApplicantsByJobService,
  updateApplicationStatusService,
} from "../services/applicationService.js";


export const applyJobController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    // 1️ Ensure user uploaded resume
    const user = await User.findById(userId);
    if (!user || !user.resumePath) {
      return res.status(400).json({
        success: false,
        message: "Please upload resume before applying",
      });
    }

    // 2️ Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // 3️ Prevent recruiter applying to own job
    const recruiterProfile = await Recruiter.findOne({ user: userId });
    if (
      recruiterProfile &&
      job.recruiter.toString() === recruiterProfile._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "You cannot apply for your own posted job",
      });
    }

    // 4️ Prevent duplicate application
    const existing = await getApplicationByJobAndUserService(jobId, userId);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already applied for this job",
      });
    }

    // 5️ Create application  FIXED
    const application = await createApplicationService({
      job: jobId,
      applicant: userId,
      resumePath: user.resumePath, 
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    console.log("applyJobController error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const myApplicationsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await getMyApplicationService(userId);

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getApplicantsByJobController = async (req, res) => {
  try {
    const { jobId } = req.params;

    // 1️ Recruiter profile
    const recruiterProfile = await Recruiter.findOne({
      user: req.user._id,
    });

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    
    if (job.recruiter.toString() !== recruiterProfile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied (Not your job)",
      });
    }

    //  Get applicants
    const applications = await getApplicantsByJobService(jobId);

    return res.status(200).json({
      success: true,
      job,
      applications,
    });
  } catch (error) {
    console.log("getApplicantsByJobController error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const updateApplicationStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["pending", "shortlisted", "rejected"];
    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updated = await updateApplicationStatusService(id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      application: updated,
    });
  } catch (error) {
    console.log("updateApplicationStatusController error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const viewApplicantResumeController = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const recruiter = await Recruiter.findOne({ user: req.user._id });

    if (
      !recruiter ||
      application.job.recruiter.toString() !== recruiter._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");

    const resumeAbsolutePath = path.join(SERVER_ROOT, application.resumePath);
    fs.createReadStream(resumeAbsolutePath).pipe(res);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
