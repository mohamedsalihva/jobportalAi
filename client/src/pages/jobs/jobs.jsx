import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      
      const res = await api.get("/jobs");
      const jobList = res.data.data || [];
      setJobs(jobList);

      
      if (jobList.length > 0) setSelectedJob(jobList[0]);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7f9] flex items-center justify-center">
        <p className="text-gray-700 font-semibold">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9] flex">
    
      <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-gray-200 p-5">
        <h2 className="text-xl font-extrabold text-gray-900">JobPortal</h2>

        <nav className="mt-6 flex flex-col gap-2">
          <button className="text-left px-4 py-3 rounded-xl bg-[#2557a7] text-white font-bold">
            Jobs
          </button>

          <button className="text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-semibold">
            Applied Jobs
          </button>

          <button className="text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-semibold">
            Saved Jobs
          </button>

          <button className="text-left px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-semibold">
            Profile
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <button className="w-full px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-semibold">
            Logout
          </button>
        </div>
      </aside>

      
      <main className="flex-1 p-6">
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Find your next job
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Browse jobs that match your skills and apply instantly.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">
              U
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Jobseeker</p>
              <p className="text-xs text-gray-500">Welcome back</p>
            </div>
          </div>
        </div>

       
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search jobs (e.g. Web Developer)"
            className="w-full md:flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2557a7] focus:ring-2 focus:ring-[#2557a7]/20"
          />

          <input
            type="text"
            placeholder="Location (e.g. Chennai)"
            className="w-full md:flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2557a7] focus:ring-2 focus:ring-[#2557a7]/20"
          />

          <button className="w-full md:w-[160px] bg-[#2557a7] text-white py-3 rounded-xl font-bold hover:bg-[#1f4c94] transition">
            Search
          </button>
        </div>

        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          <section className="lg:col-span-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-600 font-semibold">
                {jobs.length} jobs available
              </p>

              <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none">
                <option>Newest</option>
                <option>Relevance</option>
              </select>
            </div>

            <div className="space-y-4">
              {jobs.length === 0 ? (
                <p className="text-gray-600">No jobs found.</p>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                    className={`bg-white border rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition ${
                      selectedJob?._id === job._id
                        ? "border-[#2557a7]"
                        : "border-gray-200"
                    }`}
                  >
                    <h2 className="text-base font-extrabold text-gray-900">
                      {job.title}
                    </h2>

                    <p className="text-sm text-gray-600 mt-1">
                      {job.company || "Company"}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {job.location || "Location"}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-bold">
                        Full-time
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold">
                        Easy Apply
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          
          <section className="lg:col-span-7">
            {!selectedJob ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-gray-900">
                  Select a job to view details
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Click on any job card from the left to see full details.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-extrabold text-gray-900">
                  {selectedJob.title}
                </h2>

                <p className="text-sm text-gray-700 font-semibold mt-2">
                  {selectedJob.company || "Company"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {selectedJob.location || "Location"}
                </p>

                <div className="mt-5">
                  <h3 className="text-sm font-bold text-gray-900">
                    Job Description
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-6 line-clamp-6">
                    {selectedJob.description ||
                      "No job description available."}
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate(`/jobs/${selectedJob._id}`)}
                    className="w-full sm:w-1/2 bg-[#2557a7] text-white py-3 rounded-xl font-bold hover:bg-[#1f4c94] transition"
                  >
                    View Full Details
                  </button>

                  <button className="w-full sm:w-1/2 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">
                    Apply Now
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
