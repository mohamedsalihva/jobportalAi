export const API = {
  
  //Auth

  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    GOOGLE: "/auth/google",
    LOGOUT: "/auth/logout", 
  },

  //user

  USERS: {
    PROFILE: "/users/profile",
  },

  //jobSeeker

  PROFILE: {
    ME: "/profile/me",
    UPDATE: "/profile/me",
  },

  //Jobs

  JOBS: {
    ALL: "/jobs",
    SINGLE: (jobId) => `/jobs/${jobId}`,
    CREATE: "/jobs",
    MY_JOBS: "/jobs/my-jobs",
    DELETE: (jobId) => `/jobs/${jobId}`,
    UPDATE: (jobId) => `/jobs/${jobId}`,
  },


  //saved job

  SAVED: {
    MY: "/saved/my",
    TOGGLE: (jobId) => `/saved/${jobId}/save`,
  },


  //Application

 APPLICATIONS: {
  MY: "/applications/myApplication",
  APPLY: (jobId) => `/applications/${jobId}/apply`,

  JOB_APPLICANTS: (jobId) => `/applications/job/${jobId}`,
  UPDATE_STATUS: (applicationId) => `/applications/${applicationId}/status`,
},


  // recruiter 

  RECRUITER: {
    CREATE: "/recruiter/create-profile",
    MY_PROFILE: "/recruiter/profile",
    UPDATE: "/recruiter/profile",
  },

  
  AI: {
    RESUME_SCORE: (jobId) => `/ai/resume-score/${jobId}`,
  }
};
