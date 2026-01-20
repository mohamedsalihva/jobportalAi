import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import SidebarTabs from "./components/SidebarTabs";
import JobCard from "./components/JobCard";
import JobDetails from "./components/JobDetails";
import ApplyModal from "./components/ApplyModal";
import SuccessModal from "./components/SuccessModal";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("explore");

  const [savedJobsIds, setSavedJobsIds] = useState([]);

  
  const [appliedApplications, setAppliedApplications] = useState([]);

  const [userProfile, setUserProfile] = useState(null);

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applySuccessOpen, setApplySuccessOpen] = useState(false);
  const [jobToApply, setJobToApply] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
    fetchMyApplications();
    fetchUserProfile();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
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
      const res = await api.get("/saved/my");
      const saved = res.data.savedJobs || [];
      setSavedJobsIds(saved.map((job) => job._id));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  
  const fetchMyApplications = async () => {
    try {
      const res = await api.get("/applications/myApplication");
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
      const res = await api.get("/users/profile");
      setUserProfile(res.data?.userFromToken || null);
    } catch (error) {
      setUserProfile(null);
    }
  };

  
  const appliedJobsIds = useMemo(() => {
    return appliedApplications.map((a) => a.jobId);
  }, [appliedApplications]);

  const getAppliedStatusByJobId = (jobId) => {
    const found = appliedApplications.find((a) => a.jobId === jobId);
    return found?.status || null;
  };

  const toggleSaveJob = async (jobId) => {
    try {
      const isSaved = savedJobsIds.includes(jobId);

      if (isSaved) {
        await api.delete(`/saved/${jobId}/save`);
        setSavedJobsIds((prev) => prev.filter((id) => id !== jobId));
      } else {
        await api.post(`/saved/${jobId}/save`);
        setSavedJobsIds((prev) => [...prev, jobId]);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Save failed");
    }
  };

  const openApplyModal = (job) => {
    setJobToApply(job);
    setApplyModalOpen(true);
  };

  const submitApplication = async () => {
    if (!jobToApply?._id) return;

    try {
      await api.post(`/applications/${jobToApply._id}/apply`);

      setApplyModalOpen(false);
      setApplySuccessOpen(true);

      
      fetchMyApplications();
    } catch (error) {
      console.log(error.response?.data?.message || "Apply failed");
    }
  };

  const savedJobs = useMemo(() => {
    return jobs.filter((j) => savedJobsIds.includes(j._id));
  }, [jobs, savedJobsIds]);

  const appliedJobs = useMemo(() => {
    return jobs.filter((j) => appliedJobsIds.includes(j._id));
  }, [jobs, appliedJobsIds]);

  const jobsToShow =
    activeTab === "saved"
      ? savedJobs
      : activeTab === "applied"
      ? appliedJobs
      : jobs;

  return (
    <div className="min-h-screen bg-[#FBFBFE]">
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
            <h1 className="text-2xl font-extrabold text-slate-900">
              {activeTab === "explore"
                ? "Explore Jobs"
                : activeTab === "saved"
                ? "Saved Jobs"
                : "My Applications"}
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Browse jobs, save them, and apply professionally.
            </p>

            <div className="mt-6">
              {loading ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500 font-semibold">
                  Loading jobs...
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                  {/* left list */}

                  <div className="lg:col-span-5">
                    <div className="h-[calc(100vh-230px)] overflow-y-auto pr-2 space-y-3">
                      {jobsToShow.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500 font-semibold">
                          No jobs found
                        </div>
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

                  {/* right details*/}

                  <div className="hidden lg:block lg:col-span-7">
                    <div className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto rounded-2xl">
                      {selectedJob ? (
                        <JobDetails
                          job={selectedJob}
                          isSaved={savedJobsIds.includes(selectedJob._id)}
                          onSave={() => toggleSaveJob(selectedJob._id)}
                          isApplied={appliedJobsIds.includes(selectedJob._id)}
                          onApply={() => openApplyModal(selectedJob)}
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 p-12 text-center">
                          Select a job to view full details.
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
