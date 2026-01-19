import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import { Search, MapPin, Bookmark, Send, LayoutGrid } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("explore");

  const [savedJobsIds, setSavedJobsIds] = useState([]);
  const [appliedJobsIds, setAppliedJobsIds] = useState([]);

  
  const [savedJobsFull, setSavedJobsFull] = useState([]);
  const [applicationsFull, setApplicationsFull] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    await Promise.all([fetchJobs(), fetchSavedJobs(), fetchMyApplications()]);
  };

  
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
      setSavedJobsFull(saved);
      setSavedJobsIds(saved.map((job) => job._id));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  
  const fetchMyApplications = async () => {
    try {
      const res = await api.get("/applications/myApplication");
      const apps = res.data.applications || [];

      setApplicationsFull(apps);

      
      setAppliedJobsIds(apps.map((a) => a.job?._id || a.job));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  
  const toggleSaveJob = async (jobId) => {
    try {
      const isSaved = savedJobsIds.includes(jobId);

      if (isSaved) {
        await api.delete(`/saved/${jobId}/save`);
        setSavedJobsIds((prev) => prev.filter((id) => id !== jobId));
        setSavedJobsFull((prev) => prev.filter((j) => j._id !== jobId));
      } else {
        await api.post(`/saved/${jobId}/save`);
        setSavedJobsIds((prev) => [...prev, jobId]);

        
        fetchSavedJobs();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Save failed");
    }
  };

 
  const applyJob = async (jobId) => {
    try {
      await api.post(`/applications/${jobId}/apply`);
      alert("Applied successfully ");

      setAppliedJobsIds((prev) => [...prev, jobId]);

      
      fetchMyApplications();
    } catch (error) {
      alert(error.response?.data?.message || "Apply failed");
    }
  };

  
  const appliedJobsList = useMemo(() => {
    
    return jobs.filter((job) => appliedJobsIds.includes(job._id));
  }, [jobs, appliedJobsIds]);

  const savedJobsList = useMemo(() => {
    return savedJobsFull;
  }, [savedJobsFull]);

  return (
    <div className="min-h-screen bg-[#FBFBFE]">
      <Navbar />

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">

        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-4 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]">
          <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            <NavButton
              active={activeTab === "explore"}
              onClick={() => setActiveTab("explore")}
              icon={<LayoutGrid size={18} />}
              label="Explore Jobs"
            />

            <NavButton
              active={activeTab === "applied"}
              onClick={() => setActiveTab("applied")}
              icon={<Send size={18} />}
              label="My Applications"
              count={appliedJobsIds.length}
            />

            <NavButton
              active={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              icon={<Bookmark size={18} />}
              label="Saved Jobs"
              count={savedJobsIds.length}
            />
          </div>
        </aside>

        
        <main className="flex-1 overflow-x-hidden">
          
          {activeTab === "explore" && (
            <div className="p-4 lg:p-8">
              <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                  Explore jobs
                </h1>
                <p className="text-slate-500 text-sm">
                  Discover roles that match your profile and apply instantly.
                </p>

                
                <div className="mt-6 flex flex-col md:flex-row gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex-1 flex items-center px-3 border-r border-slate-100 last:border-0">
                    <Search size={18} className="text-slate-400 mr-2" />
                    <input
                      className="w-full py-2 outline-none text-sm font-medium"
                      placeholder="Search roles..."
                    />
                  </div>

                  <div className="flex-1 flex items-center px-3 border-r border-slate-100 last:border-0">
                    <MapPin size={18} className="text-slate-400 mr-2" />
                    <input
                      className="w-full py-2 outline-none text-sm font-medium"
                      placeholder="Remote or City"
                    />
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-md shadow-blue-100">
                    Search
                  </button>
                </div>
              </header>

              {loading ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500 font-semibold">
                  Loading jobs...
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                  {/* List */}

                  <div className="lg:col-span-5">
                    <div className="h-[calc(100vh-230px)] overflow-y-auto pr-2 space-y-3">
                      {jobs.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500 font-semibold">
                          No jobs found
                        </div>
                      ) : (
                        jobs.map((job) => (
                          <SmallJobCard
                            key={job._id}
                            job={job}
                            isSelected={selectedJob?._id === job._id}
                            onClick={() => setSelectedJob(job)}
                            onSave={toggleSaveJob}
                            isSaved={savedJobsIds.includes(job._id)}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  {/* Detail */}

                  <div className="hidden lg:block lg:col-span-7">
                    <div className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto rounded-2xl">
                      {selectedJob ? (
                        <DetailedJobView
                          job={selectedJob}
                          onApply={applyJob}
                          isApplied={appliedJobsIds.includes(selectedJob._id)}
                          onSave={toggleSaveJob}
                          isSaved={savedJobsIds.includes(selectedJob._id)}
                        />
                      ) : (
                        <EmptyState />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------------- Applied Tab ---------------- */}

          {activeTab === "applied" && (
            <div className="p-4 lg:p-8">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                My Applications
              </h2>

              {appliedJobsList.length === 0 ? (
                <AppliedJobsPlaceholder />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appliedJobsList.map((job) => (
                    <div
                      key={job._id}
                      className="bg-white border border-slate-200 rounded-2xl p-5"
                    >
                      <h3 className="font-extrabold text-slate-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-semibold mt-1">
                        {job.company || "Company"} • {job.location}
                      </p>
                      <p className="text-xs text-green-600 font-bold mt-2">
                        Applied
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ---------------- Saved Tab ---------------- */}

          {activeTab === "saved" && (
            <div className="p-4 lg:p-8">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                Saved Jobs
              </h2>

              {savedJobsList.length === 0 ? (
                <SavedJobsPlaceholder />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedJobsList.map((job) => (
                    <div
                      key={job._id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-extrabold text-slate-900">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-600 font-semibold mt-1">
                          {job.company || "Company"} • {job.location}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleSaveJob(job._id)}
                        className="px-3 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100"
                      >
                        Unsave
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Jobs;

/* ---------------- Components ---------------- */

const NavButton = ({ active, icon, label, onClick, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-bold whitespace-nowrap">{label}</span>
    </div>

    {count !== undefined && count !== null && !active && (
      <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md font-bold group-hover:bg-slate-200">
        {count}
      </span>
    )}
  </button>
);

const SmallJobCard = ({ job, isSelected, onClick, onSave, isSaved }) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
      isSelected
        ? "border-blue-600 ring-2 ring-blue-50"
        : "border-slate-200 hover:border-slate-300"
    }`}
  >
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 text-sm shrink-0">
        {job.company?.[0] || "C"}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-extrabold text-slate-900 text-[15px] truncate">
          {job.title}
        </h4>

        <p className="text-xs text-slate-600 font-semibold truncate mt-0.5">
          {job.company || "Company"}
        </p>

        <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
          {job.location || "Location"} • {job.jobType || "Full-time"}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSave(job._id);
        }}
        className={`p-2 rounded-xl border transition ${
          isSaved
            ? "border-blue-600 text-blue-600 bg-blue-50"
            : "border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
        }`}
      >
        <Bookmark size={18} />
      </button>
    </div>

    <div className="mt-3 flex flex-wrap gap-2">
      <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
        {job.salary || "Not disclosed"}
      </span>

      <span className="text-[11px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
        {job.experienceRequired || "0-2 yrs"}
      </span>
    </div>
  </div>
);

const DetailedJobView = ({ job, onApply, isApplied, onSave, isSaved }) => (
  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
    {/* Header */}
    <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
          {job?.title?.[0] || "J"}
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-slate-900">{job.title}</h2>

          <p className="text-sm text-slate-600 font-semibold mt-1">
            📍 {job.location} • {job.jobType} • {job.workMode}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[11px] font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
              💰 {job.salary || "Not disclosed"}
            </span>

            <span className="text-[11px] font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
              🧑‍💻 {job.experienceRequired || "Not mentioned"}
            </span>

            {job.isActive ? (
              <span className="text-[11px] font-bold px-3 py-1 bg-green-50 text-green-700 rounded-full">
                ✅ Active
              </span>
            ) : (
              <span className="text-[11px] font-bold px-3 py-1 bg-red-50 text-red-700 rounded-full">
                ❌ Closed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onSave(job._id)}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm transition ${
            isSaved
              ? "border-blue-600 text-blue-600 bg-blue-50"
              : "border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <Bookmark size={18} />
          {isSaved ? "Saved" : "Save"}
        </button>

        <button
          disabled={isApplied}
          onClick={() => onApply(job._id)}
          className={`px-5 py-2 rounded-xl font-bold text-sm shadow-sm transition ${
            isApplied
              ? "bg-green-600 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
      </div>
    </div>

   
    <div className="p-6 space-y-6">
      {/* Description */}
      <section>
        <h3 className="text-sm font-extrabold text-slate-900">Job Description</h3>
        <p className="text-sm text-slate-600 leading-relaxed mt-2">
          {job.description || "No description available."}
        </p>
      </section>

      {/* Skills */}
      {Array.isArray(job.skills) && job.skills.length > 0 && (
        <section>
          <h3 className="text-sm font-extrabold text-slate-900">Skills</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {Array.isArray(job.languages) && job.languages.length > 0 && (
        <section>
          <h3 className="text-sm font-extrabold text-slate-900">Languages</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.languages.map((lang, index) => (
              <span
                key={index}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
              >
                {lang}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Responsibilities */}
      {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
        <section>
          <h3 className="text-sm font-extrabold text-slate-900">
            Responsibilities
          </h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-600 list-disc list-inside">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Requirements */}
      {Array.isArray(job.requirements) && job.requirements.length > 0 && (
        <section>
          <h3 className="text-sm font-extrabold text-slate-900">Requirements</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-600 list-disc list-inside">
            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      {Array.isArray(job.benefits) && job.benefits.length > 0 && (
        <section>
          <h3 className="text-sm font-extrabold text-slate-900">Benefits</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.benefits.map((item, index) => (
              <span
                key={index}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Extra Info */}
      <section className="pt-4 border-t border-slate-100">
        <p className="text-[11px] text-slate-400 font-semibold">
          Job ID: <span className="text-slate-500">{job._id}</span>
        </p>
        <p className="text-[11px] text-slate-400 font-semibold mt-1">
          Recruiter ID:{" "}
          <span className="text-slate-500">{job.recruiter}</span>
        </p>
      </section>
    </div>
  </div>
);


const AppliedJobsPlaceholder = () => (
  <div className="p-8 text-center text-slate-400">
    <Send size={48} className="mx-auto mb-4 opacity-20" />
    <p className="font-semibold">You haven't applied to any jobs yet.</p>
  </div>
);

const SavedJobsPlaceholder = () => (
  <div className="p-8 text-center text-slate-400">
    <Bookmark size={48} className="mx-auto mb-4 opacity-20" />
    <p className="font-semibold">No saved jobs yet.</p>
  </div>
);

const EmptyState = () => (
  <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 p-12 text-center">
    <p className="font-medium">
      Select a job from the list to view its full details.
    </p>
  </div>
);
