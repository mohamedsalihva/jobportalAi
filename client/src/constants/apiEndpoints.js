
  
  export const API = {
  // 🔐 AUTH
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    GOOGLE: "/auth/google",
    LOGOUT: "/auth/logout",
  },

  // 🔐 AUTH CHECK (cookie → user)
  USERS: {
    PROFILE: "/users/profile",
  },

  // 👤 JOBSEEKER PROFILE DATA
  PROFILE: {
    ME: "/profile/me",
    UPDATE: "/profile/me",
    UPLOAD_RESUME: "/profile/resume",
  },

  // 💼 JOBS
  JOBS: {
    ALL: "/jobs",
    SINGLE: (id) => `/jobs/${id}`,
    CREATE: "/jobs",
    MY_JOBS: "/jobs/my-jobs",
    DELETE: (id) => `/jobs/${id}`,
    UPDATE: (id) => `/jobs/${id}`,
  },

  // ⭐ SAVED JOBS
  SAVED: {
    MY: "/saved/my",
    TOGGLE: (id) => `/saved/${id}/save`,
  },

  // 📄 APPLICATIONS
  APPLICATIONS: {
    MY: "/applications/myApplication",
    APPLY: (id) => `/applications/${id}/apply`,
    JOB_APPLICANTS: (id) => `/applications/job/${id}`,
    UPDATE_STATUS: (id) => `/applications/${id}/status`,
  },

  // 🧑‍💼 RECRUITER
  RECRUITER: {
    CREATE: "/recruiter/create-profile",
    MY_PROFILE: "/recruiter/profile",
    UPDATE: "/recruiter/profile",
  },

  // 🤖 AI
  AI: {
    RESUME_SCORE: (id) => `/ai/resume-score/${id}`,
  },
};


