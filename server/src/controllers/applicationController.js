import Job from "../models/Job.js";
import Recruiter from "../models/Recruiter.js";

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

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    
    const recruiterProfile = await Recruiter.findOne({ user: userId });

   
    if (recruiterProfile && job.recruiter.toString() === recruiterProfile._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot apply for your own posted job",
      });
    }

    const existing = await getApplicationByJobAndUserService(jobId, userId);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already applied for this job",
      });
    }

    const application = await createApplicationService({
      job: jobId,
      applicant: userId,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};




export const myApplicationsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await getMyApplicationService(userId);

    res.json({
      success: true,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const getApplicantsByJobController = async (req, res) => {
  try {
    const { jobId } = req.params;

    
    const recruiterProfile = await Recruiter.findOne({ user: req.user._id });

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
