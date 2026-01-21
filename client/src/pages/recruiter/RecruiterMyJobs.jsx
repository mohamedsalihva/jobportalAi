import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/ui/Toast";
import { API } from "../../constants/apiEndpoints";
import { Briefcase, Search, PlusCircle, Trash2, Pencil, Users } from "lucide-react";

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

    if (filter === "active") list = list.filter((j) => j.isActive === true);
    if (filter === "inactive") list = list.filter((j) => j.isActive === false);

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
      showToast("success", "Job deleted ✅");
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (error) {
      console.log(error);
      showToast("error", error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={hideToast}
      />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {/* ✅ Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              My Jobs
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Total: <span className="font-extrabold">{stats.total}</span> • Active:{" "}
              <span className="font-extrabold">{stats.active}</span> • Inactive:{" "}
              <span className="font-extrabold">{stats.inactive}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/recruiter/post-job")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 text-black font-extrabold hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
          >
            <PlusCircle size={18} />
            Post New Job
          </button>
        </div>

        {/* ✅ Search + Filter */}
        <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-[60%]">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs by title, location, type..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0B0F]/40 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-[40%] px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0B0F]/40 text-sm font-extrabold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition"
          >
            <option value="all">All Jobs</option>
            <option value="active">Active Jobs</option>
            <option value="inactive">Inactive Jobs</option>
          </select>
        </div>

        {/* ✅ Content */}
        {loading ? (
          <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center font-extrabold text-slate-500 dark:text-slate-300">
            Loading your jobs...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
              <Briefcase className="text-amber-500" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-4">
              No jobs found
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Try changing filters or post a new job.
            </p>

            <button
              onClick={() => navigate("/recruiter/post-job")}
              className="mt-6 px-7 py-3.5 rounded-2xl bg-amber-500 text-black font-extrabold hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
            >
              Post Job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* ✅ Top Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white truncate">
                      {job.title}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {job.location} • {job.jobType}
                    </p>
                  </div>

                  {/* ✅ Status Badge */}
                  <div
                    className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                      job.isActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20"
                        : "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20"
                    }`}
                  >
                    {job.isActive ? "Active" : "Inactive"}
                  </div>
                </div>

                {/* ✅ Info */}
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <p>
                    <span className="font-extrabold">Salary:</span>{" "}
                    {job.salary || "Not disclosed"}
                  </p>
                  <p>
                    <span className="font-extrabold">Experience:</span>{" "}
                    {job.experienceRequired}
                  </p>
                  <p>
                    <span className="font-extrabold">Work Mode:</span>{" "}
                    {job.workMode || "Onsite"}
                  </p>
                </div>

                {/* ✅ Skills */}
                {job.skills?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.slice(0, 6).map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-transparent dark:border-white/10"
                      >
                        {sk}
                      </span>
                    ))}

                    {job.skills.length > 6 && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-transparent dark:border-white/10">
                        +{job.skills.length - 6} more
                      </span>
                    )}
                  </div>
                )}

                {/* ✅ Actions */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      navigate(`/recruiter/job/${job._id}/applicants`)
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500 text-black font-extrabold hover:bg-amber-400 transition"
                  >
                    <Users size={16} />
                    Applicants
                  </button>

                  <button
                    onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-300 font-extrabold hover:bg-red-100 dark:hover:bg-red-500/15 transition border border-red-100 dark:border-red-500/20"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>

                {/* ✅ Footer */}
                <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
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
