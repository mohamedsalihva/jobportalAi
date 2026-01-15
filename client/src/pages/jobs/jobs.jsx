import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import { Search, MapPin, Bookmark, Send, LayoutGrid } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("explore");

  useEffect(() => {
    fetchJobs();
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

  return (
    <div className="min-h-screen bg-[#FBFBFE]">
      <Navbar />

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        
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
              count="3"
            />

            <NavButton
              active={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              icon={<Bookmark size={18} />}
              label="Saved Jobs"
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
                          />
                        ))
                      )}
                    </div>
                  </div>

                 
                  <div className="hidden lg:block lg:col-span-7">
                    <div className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto rounded-2xl">
                      {selectedJob ? (
                        <DetailedJobView job={selectedJob} />
                      ) : (
                        <EmptyState />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          
          {activeTab === "applied" && <AppliedJobsPlaceholder />}

          
          {activeTab === "saved" && <SavedJobsPlaceholder />}
        </main>
      </div>
    </div>
  );
};

export default Jobs;



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

    {count && !active && (
      <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md font-bold group-hover:bg-slate-200">
        {count}
      </span>
    )}
  </button>
);

const SmallJobCard = ({ job, isSelected, onClick }) => (
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
           {job.location || "Location"} •  {job.jobType || "Full-time"}
        </p>
      </div>

      <button
        onClick={(e) => e.stopPropagation()}
        className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
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

    {Array.isArray(job.skills) && job.skills.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-2">
        {job.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600"
          >
            {skill}
          </span>
        ))}

        {job.skills.length > 3 && (
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>
    )}

    <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 font-medium">
      <span>Posted recently</span>
      <span className="text-blue-600 font-bold">View →</span>
    </div>
  </div>
);

const DetailedJobView = ({ job }) => (
  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
    <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
          {job?.title?.[0] || "J"}
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">{job.title}</h2>

          <p className="text-sm text-slate-600 font-semibold mt-1">
            {job.location} • {job.jobType} • {job.workMode}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Experience:{" "}
            <span className="font-semibold text-slate-600">
              {job.experienceRequired}
            </span>
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Salary:{" "}
            <span className="font-semibold text-slate-600">
              {job.salary || "Not disclosed"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
          <Bookmark size={20} />
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-all">
          Apply Now
        </button>
      </div>
    </div>

    <div className="p-6 space-y-6">
      <div>
        <h5 className="font-bold text-slate-900 text-sm">Job Description</h5>
        <p className="text-slate-600 text-sm leading-relaxed mt-2">
          {job.description}
        </p>
      </div>

      {job.skills?.length > 0 && (
        <div>
          <h5 className="font-bold text-slate-900 text-sm">Skills</h5>
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
        </div>
      )}

      {job.responsibilities?.length > 0 && (
        <div>
          <h5 className="font-bold text-slate-900 text-sm">Responsibilities</h5>
          <ul className="mt-2 space-y-2 text-sm text-slate-600 list-disc list-inside">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {job.requirements?.length > 0 && (
        <div>
          <h5 className="font-bold text-slate-900 text-sm">Requirements</h5>
          <ul className="mt-2 space-y-2 text-sm text-slate-600 list-disc list-inside">
            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {job.benefits?.length > 0 && (
        <div>
          <h5 className="font-bold text-slate-900 text-sm">Benefits</h5>
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
        </div>
      )}
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
    <p className="font-medium">Select a job from the list to view its full details.</p>
  </div>
);
