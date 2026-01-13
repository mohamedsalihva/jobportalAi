import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    companyName: {
      type: String,
      required: true
    },

    companyLocation: {
      type: String,
      required: true
    },

    companyWebsite: String,
    industry: String,

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Recruiter", recruiterSchema);
