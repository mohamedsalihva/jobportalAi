import {
  createApplicationService,
  getApplicationByJobAndUserService,
  getMyApplicationService,
} from "../services/applicationService.js";

export const applyJobController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;
    console.log("jobId:", jobId);
console.log("userId:", userId);


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

    res.json({
      success: true,
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





export const myApplicationsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await getMyApplicationService(userId);

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
