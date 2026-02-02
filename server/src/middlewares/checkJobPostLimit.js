import User from "../models/User.js";

const checkJobPostLimit = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // skip limit check for pro users
    if (user.premium?.isPremium === true) {
      return next();
    }

    // FREE USERS ONLY
    if (user.jobPostedCount >= user.jobPostedLimit) {
      return res.status(403).json({
        message: "Job post limit reached. Upgrade to Pro.",
        upgradeRequired: true,
      });
    }

    next();
  } catch (error) {
    console.error("job limit check error:", error);
    return res.status(500).json({ message: "Job limit check failed" });
  }
};

export default checkJobPostLimit;
