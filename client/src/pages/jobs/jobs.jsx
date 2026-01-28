import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import SidebarTabs from "./components/SidebarTabs";
import JobCard from "./components/JobCard";
import JobDetails from "./components/JobDetails";
import ApplyModal from "./components/ApplyModal";
import SuccessModal from "./components/SuccessModal";
import { API } from "../../constants/apiEndpoints";

const Jobs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("explore");

  const [savedJobsIds, setSavedJobsIds] = useState([]);
  const [appliedApplications, setAppliedApplications] = useState([]);

  const [userProfile, setUserProfile] = useState(null);
  const [recruiterProfile, setRecruiterProfile] = useState(null);

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applySuccessOpen, setApplySuccessOpen] = useState(false);
  const [jobToApply, setJobToApply] = useState(null);

 
  const cameFromRecruiterDashboard =
    location.state?.fromRecruiterDashboard === true;

  const isRecruiter = userProfile?.role === "recruiter";

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
    fetchMyApplications();
    fetchUserProfile();
    fetchRecruiterProfile();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get(API.JOBS.ALL);
      const data = res.data.data || [];
      setJobs(data);
      if (data.length > 0) setSelectedJob(data[0]);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const res = await api.get(API.SAVED.MY);
      const saved = res.data.savedJobs || [];
      setSavedJobsIds(saved.map((job) => job._id));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const res = await api.get(API.APPLICATIONS.MY);
      const apps = res.data.applications || [];
      setAppliedApplications(
        apps.map((a) => ({
          applicationId: a._id,
          jobId: a.job?._id || a.job,
          status: a.status || "pending",
        }))
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await api.get(API.USERS.PROFILE);
      setUserProfile(res.data?.userFromToken || null);
    } catch {
      setUserProfile(null);
    }
  };

  const fetchRecruiterProfile = async () => {
    try {
      const res = await api.get(API.RECRUITER.MY_PROFILE);
      setRecruiterProfile(res.data?.data || null);
    } catch {
      setRecruiterProfile(null);
    }
  };

  const appliedJobsIds = useMemo(
    () => appliedApplications.map((a) => a.jobId),
    [appliedApplications]
  );

  const getAppliedStatusByJobId = (jobId) => {
    const found = appliedApplications.find((a) => a.jobId === jobId);
    return found?.status || null;
  };

  const toggleSaveJob = async (jobId) => {
    try {
      const isSaved = savedJobsIds.includes(jobId);
      if (isSaved) {
        await api.delete(API.SAVED.TOGGLE(jobId));
        setSavedJobsIds((prev) => prev.filter((id) => id !== jobId));
      } else {
        await api.post(API.SAVED.TOGGLE(jobId));
        setSavedJobsIds((prev) => [...prev, jobId]);
      }
    } catch {
      console.log("Save failed");
    }
  };

  const openApplyModal = (job) => {
    setJobToApply(job);
    setApplyModalOpen(true);
  };

  const submitApplication = async () => {
    if (!jobToApply?._id) return;
    try {
      await api.post(API.APPLICATIONS.APPLY(jobToApply._id));
      setApplyModalOpen(false);
      setApplySuccessOpen(true);
      fetchMyApplications();
    } catch {
      console.log("Apply failed");
    }
  };

  const savedJobs = useMemo(
    () => jobs.filter((j) => savedJobsIds.includes(j._id)),
    [jobs, savedJobsIds]
  );

  const appliedJobs = useMemo(
    () => jobs.filter((j) => appliedJobsIds.includes(j._id)),
    [jobs, appliedJobsIds]
  );

  const jobsToShow =
    activeTab === "saved"
      ? savedJobs
      : activeTab === "applied"
      ? appliedJobs
      : jobs;

  return (
    <div className="min-h-screen font-sans bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        <SidebarTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedJobsIds.length}
          appliedCount={appliedApplications.length}
        />

        <main className="flex-1 overflow-x-hidden">
          <div className="p-4 lg:p-8">

            
            {isRecruiter && cameFromRecruiterDashboard && (
              <div className="mb-6 flex items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-400/20">
                <span className="font-semibold text-amber-800 dark:text-amber-300">
                  You are viewing jobs as a recruiter
                </span>
                <button
                  onClick={() => navigate("/recruiter/dashboard")}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600"
                >
                  Go back to Dashboard
                </button>
              </div>
            )}

            <h1 className="text-[28px] sm:text-[34px] font-bold">
              {activeTab === "explore"
                ? "Explore Jobs"
                : activeTab === "saved"
                ? "Saved Jobs"
                : "My Applications"}
            </h1>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Browse jobs, save them, and apply professionally.
            </p>

            <div className="mt-6">
              {loading ? (
                <div className="p-6 text-center">Loading jobs...</div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5">
                    <div className="h-[calc(100vh-230px)] overflow-y-auto space-y-3">
                      {jobsToShow.length === 0 ? (
                        <div className="p-6 text-center">No jobs found</div>
                      ) : (
                        jobsToShow.map((job) => (
                          <JobCard
                            key={job._id}
                            job={job}
                            isSelected={selectedJob?._id === job._id}
                            onClick={() => setSelectedJob(job)}
                            onSave={() => toggleSaveJob(job._id)}
                            isSaved={savedJobsIds.includes(job._id)}
                            appliedStatus={
                              activeTab === "applied"
                                ? getAppliedStatusByJobId(job._id)
                                : null
                            }
                          />
                        ))
                      )}
                    </div>
                  </div>

                  <div className="hidden lg:block lg:col-span-7">
                    <div className="sticky top-24 h-[calc(100vh-120px)]">
                      {selectedJob ? (
                        <JobDetails
                          job={selectedJob}
                          isSaved={savedJobsIds.includes(selectedJob._id)}
                          onSave={() => toggleSaveJob(selectedJob._id)}
                          isApplied={appliedJobsIds.includes(selectedJob._id)}
                          onApply={() => openApplyModal(selectedJob)}
                          recruiterProfile={recruiterProfile}
                        />
                      ) : (
                        <div className="p-12 text-center">
                          Select a job to view details
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <ApplyModal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        job={jobToApply}
        user={userProfile}
        onSubmit={submitApplication}
      />

      <SuccessModal
        open={applySuccessOpen}
        onClose={() => setApplySuccessOpen(false)}
        onViewApplications={() => {
          setApplySuccessOpen(false);
          setActiveTab("applied");
          fetchMyApplications();
        }}
      />
    </div>
  );
};

export default Jobs;
