import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true
    },

    location: {
      type: String,
      required: true
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true
    },

    experienceRequired: {
      type: String,
      required: true
    },

    skills: [String],

    languages: [String],

    description: {
      type: String,
      required: true
    },

    responsibilities: [String],

    requirements: [String],

    benefits: [String],

    workMode: {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"],
      default: "Onsite"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
