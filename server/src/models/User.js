import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: function () {
      return this.provider === "local";
    },
  },

  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  role: {
    type: String,
    enum: ["jobSeeker", "admin", "recruiter"],
    default: "jobSeeker",
  },

  jobPostedLimit: {
    type: Number,
    default: 3,
  },
  jobPostedCount: {
    type: Number,
    default: 0,
  },

  premium: {
    isPremium: {
      type: Boolean,
      default: false
    },
    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free"
    },
    expireAt: {
      type: Date,
      default: null
    },

  },


  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  }, ],


  phone: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },

  headline: {
    type: String,
    default: ""
  },
  summary: {
    type: String,
    default: ""
  },

  skills: {
    type: [String],
    default: []
  },

  resumeUrl: {
    type: String,
    default: ""
  },

  experience: [{
    title: {
      type: String,
      default: ""
    },
    company: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    startDate: {
      type: String,
      default: ""
    },
    endDate: {
      type: String,
      default: ""
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ""
    },
  }, ],

  education: [{
    degree: {
      type: String,
      default: ""
    },
    institution: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    startYear: {
      type: String,
      default: ""
    },
    endYear: {
      type: String,
      default: ""
    },
  }, ],

  achievements: {
    type: [String],
    default: []
  },
  certifications: {
    type: [String],
    default: []
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", userSchema);