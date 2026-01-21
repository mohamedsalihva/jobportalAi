import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/ui/Toast";
import { API } from "../../constants/apiEndpoints";

const RecruiterMyJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); 

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get(API.JOBS.MY_JOBS);
      setJobs(res.data.jobs || []);
    } catch (error) {
      console.log(error);
      showToast("error", error.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let list = [...jobs];

    
    if (filter === "active") {
      list = list.filter((j) => j.isActive === true);
    } else if (filter === "inactive") {
      list = list.filter((j) => j.isActive === false);
    }

    
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter((j) => {
        return (
          j.title?.toLowerCase().includes(s) ||
          j.location?.toLowerCase().includes(s) ||
          j.jobType?.toLowerCase().includes(s)
        );
      });
    }

    return list;
  }, [jobs, filter, search]);

  const stats = useMemo(() => {
    const total = jobs.length;
    const active = jobs.filter((j) => j.isActive === true).length;
    const inactive = jobs.filter((j) => j.isActive === false).length;
    return { total, active, inactive };
  }, [jobs]);

  const handleDelete = async (jobId) => {
    try {
      await api.delete(API.JOBS.DELETE(jobId));
      showToast("success", "Job deleted ");
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (error) {
      console.log(error);
      showToast("error", error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE]">
      <Navbar />

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={hideToast}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">My Jobs</h1>
            <p className="text-sm text-slate-600 mt-1">
              Total: <span className="font-bold">{stats.total}</span> • Active:{" "}
              <span className="font-bold">{stats.active}</span> • Inactive:{" "}
              <span className="font-bold">{stats.inactive}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/recruiter/post-job")}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            + Post New Job
          </button>
        </div>

        
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title, location, type..."
            className="w-full md:w-[60%] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-[40%] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          >
            <option value="all">All Jobs</option>
            <option value="active">Active Jobs</option>
            <option value="inactive">Inactive Jobs</option>
          </select>
        </div>

        
        {loading ? (
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-8 text-center font-bold text-slate-500">
            Loading your jobs...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <h2 className="text-lg font-extrabold text-slate-900">
              No jobs found
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Try changing filters or post a new job.
            </p>

            <button
              onClick={() => navigate("/recruiter/post-job")}
              className="mt-5 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
            >
              Post Job
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {job.title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {job.location} • {job.jobType}
                    </p>
                  </div>

                  
                  <div
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      job.isActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {job.isActive ? "Active" : "Inactive"}
                  </div>
                </div>

                
                <div className="mt-3 text-sm text-slate-600 space-y-1">
                  <p>
                    <span className="font-bold">Salary:</span>{" "}
                    {job.salary || "Not disclosed"}
                  </p>
                  <p>
                    <span className="font-bold">Experience:</span>{" "}
                    {job.experienceRequired}
                  </p>
                  <p>
                    <span className="font-bold">Work Mode:</span>{" "}
                    {job.workMode || "Onsite"}
                  </p>
                </div>

               
                {job.skills?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.slice(0, 6).map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700"
                      >
                        {sk}
                      </span>
                    ))}
                    {job.skills.length > 6 && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        +{job.skills.length - 6} more
                      </span>
                    )}
                  </div>
                )}

                
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      navigate(`/recruiter/job/${job._id}/applicants`)
                    }
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                  >
                    Applicants
                  </button>

                  <button
                    onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                    className="px-4 py-2 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>

                
                <p className="mt-4 text-xs text-slate-400">
                  Posted on:{" "}
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterMyJobs;
