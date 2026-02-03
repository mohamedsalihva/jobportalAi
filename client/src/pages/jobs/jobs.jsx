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
import FloatingRewriteButton from "../../components/floatingComponent/FloatingRewriteButton";

const Jobs = () => {
  console.log("Jobs page loaded");

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
  }, []);

 const fetchJobs = async () => {
  try {
    const res = await api.get(API.JOBS.ALL);
    console.log("Jobs API Response:", res.data);

    const data = res.data?.data || res.data?.jobs || res.data || [];
    setJobs(data);

    if (data.length) setSelectedJob(data[0]);
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
  } finally {
    setLoading(false);
  }
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
  try {
    const res = await api.get(API.PROFILE.ME);
    const profile = res.data?.profile || null;
    console.log("Fetched profile:", profile);
    setUserProfile(profile);
  } catch (err) {
    const fallbackRes = await api.get(API.USERS.PROFILE);
    const user = fallbackRes.data?.userFromToken || null;
    console.log("Fetched user:", user);
    setUserProfile(user);
  }
};



  const fetchRecruiterProfile = async () => {
  try {
    const res = await api.get(API.RECRUITER.MY_PROFILE);
    setRecruiterProfile(res.data?.data || null);
  } catch (err) {
    console.log("Not a recruiter, skipping recruiter profile");
    setRecruiterProfile(null);
  }
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
              

              <div className="lg:col-span-5 space-y-3 h-[calc(100vh-120px)] overflow-y-auto">
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

            
              <div className="hidden lg:block lg:col-span-7 h-[calc(100vh-120px)] overflow-y-auto">
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
      {selectedJob && (
  <FloatingRewriteButton jobId={selectedJob._id} />
)}
    </div>
  );
};

export default Jobs;
