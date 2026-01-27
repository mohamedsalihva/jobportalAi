import User from "../models/User";

const checkJobPostLimit = async (req,res,next)=>{
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        if(user.role !=="recruiter"){
            return res.status(403).json({ message: "only recruiter can post job"});
        }

        if(user.jobPostedCount >= user.jobPostedLimit){
            return res.status(403).json({
                message: "job post limit reached upgrade to premium",
                upgradeRequired: true,
            });
        }

        next();

    } catch (error) {
        console.error("job limit check error:", error);
        res.status(500).json({message:"job limit check failed"});
    }
};

export default checkJobPostLimit;