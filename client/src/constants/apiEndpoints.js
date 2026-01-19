export const API = {
  JOBS: "/jobs",

  SAVED: {
    MY: "/saved/my",
    TOGGLE: (jobId) => `/saved/${jobId}/save`,
  },

  APPLICATIONS: {
    MY: "/applications/my",
    APPLY: (jobId) => `/applications/${jobId}/apply`,
  },
};
