import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import SidebarTabs from "./components/SidebarTabs";
import JobCard from "./components/JobCard";
import JobDetails from "./components/JobDetails";
import ApplyModal from "./components/ApplyModal";
import SuccessModal from "./components/SuccessModal";
import MobileJobSheet from "./components/MobileJobSheet";
import { API } from "../../constants/apiEndpoints";

const Jobs = () => {
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

  const [mobileJobOpen, setMobileJobOpen] = useState(false);

  

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
    fetchMyApplications();
    fetchUserProfile();
    fetchRecruiterProfile();
  }, []);

  const fetchJobs = async () => {
    const res = await api.get(API.JOBS.ALL);
    const data = res.data.data || [];
    setJobs(data);
    if (data.length) setSelectedJob(data[0]);
    setLoading(false);
  };

  const fetchSavedJobs = async () => {
    const res = await api.get(API.SAVED.MY);
    setSavedJobsIds((res.data.savedJobs || []).map(j => j._id));
  };

  const fetchMyApplications = async () => {
    const res = await api.get(API.APPLICATIONS.MY);
    setAppliedApplications(
      (res.data.applications || []).map(a => ({
        jobId: a.job?._id || a.job,
        status: a.status,
      }))
    );
  };

  const fetchUserProfile = async () => {
    const res = await api.get(API.USERS.PROFILE);
    setUserProfile(res.data?.userFromToken || null);
  };

  const fetchRecruiterProfile = async () => {
    const res = await api.get(API.RECRUITER.MY_PROFILE);
    setRecruiterProfile(res.data?.data || null);
  };

  

  const appliedStatusMap = useMemo(() => {
    const map = {};
    appliedApplications.forEach(a => {
      map[a.jobId] = a.status;
    });
    return map;
  }, [appliedApplications]);

  const appliedJobsIds = useMemo(
    () => appliedApplications.map(a => a.jobId),
    [appliedApplications]
  );

  const jobsToShow =
    activeTab === "saved"
      ? jobs.filter(j => savedJobsIds.includes(j._id))
      : activeTab === "applied"
      ? jobs.filter(j => appliedJobsIds.includes(j._id))
      : jobs;

  

  const toggleSaveJob = async (jobId) => {
    const isSaved = savedJobsIds.includes(jobId);
    await api[isSaved ? "delete" : "post"](API.SAVED.TOGGLE(jobId));
    setSavedJobsIds(prev =>
      isSaved ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const openApplyModal = (job) => {
    setJobToApply(job);
    setApplyModalOpen(true);
  };

  const submitApplication = async () => {
    await api.post(API.APPLICATIONS.APPLY(jobToApply._id));
    setApplyModalOpen(false);
    setApplySuccessOpen(true);
    fetchMyApplications();
  };

  

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
        <SidebarTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedJobsIds.length}
          appliedCount={appliedApplications.length}
        />

        <main className="flex-1 p-4 lg:p-8">
          {loading ? (
            <div className="text-center p-10">Loading jobs...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              

              <div className="lg:col-span-5 space-y-3">
                {jobsToShow.map(job => (
                  <JobCard
                    key={job._id}
                    job={job}
                    isSelected={selectedJob?._id === job._id}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setSelectedJob(job);
                        setMobileJobOpen(true);
                      } else {
                        setSelectedJob(job);
                      }
                    }}
                    onSave={() => toggleSaveJob(job._id)}
                    isSaved={savedJobsIds.includes(job._id)}
                    appliedStatus={appliedStatusMap[job._id]}
                  />
                ))}
              </div>

            
              <div className="hidden lg:block lg:col-span-7 sticky top-24">
                {selectedJob && (
                  <JobDetails
                    job={selectedJob}
                    recruiterProfile={recruiterProfile}
                    isSaved={savedJobsIds.includes(selectedJob._id)}
                    isApplied={appliedJobsIds.includes(selectedJob._id)}
                    onSave={() => toggleSaveJob(selectedJob._id)}
                    onApply={() => openApplyModal(selectedJob)}
                  />
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <MobileJobSheet
        open={mobileJobOpen}
        job={selectedJob}
        isApplied={appliedJobsIds.includes(selectedJob?._id)}
        onClose={() => setMobileJobOpen(false)}
        onApply={() => openApplyModal(selectedJob)}
      />

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
      />
    </div>
  );
};

export default Jobs;
