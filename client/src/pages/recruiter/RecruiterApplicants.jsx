import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/ui/Toast";
import { API } from "../../constants/apiEndpoints";

const RecruiterApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [apps, setApps] = useState([]);
  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");

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

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const res = await api.get(API.APPLICATIONS.JOB_APPLICANTS(jobId));
      setApps(res.data.applications || []);

      if (res.data.job) setJob(res.data.job);
    } catch (error) {
      console.log(error);
      showToast(
        "error",
        error.response?.data?.message || "Failed to load applicants"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const res = await api.get(API.JOBS.SINGLE(jobId));
      const jobData = res.data.job || res.data.data || res.data;
      setJob(jobData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchApplicants();
    fetchJobDetails();
  }, [jobId]);

  const stats = useMemo(() => {
    const total = apps.length;
    const pending = apps.filter(
      (a) => (a.status || "pending") === "pending"
    ).length;
    const shortlisted = apps.filter((a) => a.status === "shortlisted").length;
    const rejected = apps.filter((a) => a.status === "rejected").length;

    return { total, pending, shortlisted, rejected };
  }, [apps]);

  const filteredApps = useMemo(() => {
    if (!search.trim()) return apps;

    const s = search.toLowerCase();

    return apps.filter((a) => {
      const name = a?.applicant?.name?.toLowerCase() || "";
      const email = a?.applicant?.email?.toLowerCase() || "";
      return name.includes(s) || email.includes(s);
    });
  }, [apps, search]);

  const getStatusStyle = (status) => {
    if (status === "shortlisted") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20";
    }
    if (status === "rejected") {
      return "bg-red-50 text-red-700 border border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20";
    }
    return "bg-slate-100 text-slate-700 border border-slate-200 dark:bg-white/5 dark:text-slate-200 dark:border-white/10";
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      setUpdatingId(applicationId);

      await api.put(API.APPLICATIONS.UPDATE_STATUS(applicationId), {
        status: newStatus,
      });

      setApps((prev) =>
        prev.map((a) =>
          a._id === applicationId ? { ...a, status: newStatus } : a
        )
      );

      showToast("success", "Application status updated ✅");
    } catch (error) {
      console.log(error);
      showToast(
        "error",
        error.response?.data?.message || "Status update failed"
      );
    } finally {
      setUpdatingId(null);
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

      <div className="max-w-6xl mx-auto px-4 py-10">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Applicants
            </h1>

            {job?.title && (
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Job:{" "}
                <span className="font-extrabold text-slate-900 dark:text-white">
                  {job.title}
                </span>
              </p>
            )}

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Total: <span className="font-extrabold">{stats.total}</span> •
              Pending: <span className="font-extrabold">{stats.pending}</span> •
              Shortlisted:{" "}
              <span className="font-extrabold">{stats.shortlisted}</span> •
              Rejected: <span className="font-extrabold">{stats.rejected}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/recruiter/my-jobs")}
            className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition"
          >
            Back to My Jobs
          </button>
        </div>

        
        <div className="mt-6 bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-2xl p-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applicants by name or email..."
            className="w-full border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none bg-white dark:bg-[#0B0B0F]/40 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500"
          />
        </div>

        
        {loading ? (
          <div className="mt-6 bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-2xl p-8 text-center font-extrabold text-slate-500 dark:text-slate-300">
            Loading applicants...
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="mt-6 bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-2xl p-10 text-center">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              No applicants found
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Candidates will appear here once they apply.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {filteredApps.map((a) => {
              const status = a.status || "pending";

              return (
                <div
                  key={a._id}
                  className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-5 transition hover:shadow-sm"
                >
                  
                  <div className="min-w-0">
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white truncate">
                      {a.applicant?.name || "Candidate"}
                    </h2>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Email:{" "}
                      <span className="font-bold">
                        {a.applicant?.email || "N/A"}
                      </span>
                    </p>

                    {a.resumeUrl ? (
                      <a
                        href={a.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-600 dark:text-amber-400 font-extrabold text-sm mt-2 inline-block hover:underline"
                      >
                        View Resume →
                      </a>
                    ) : (
                      <p className="text-xs text-slate-400 mt-2">
                        Resume not available
                      </p>
                    )}

                    {a.atsScore !== undefined && a.atsScore !== null && (
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                        ATS Score:{" "}
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          {a.atsScore}%
                        </span>
                      </p>
                    )}

                    <p className="text-xs text-slate-400 mt-2">
                      Applied on:{" "}
                      {a.createdAt
                        ? new Date(a.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div
                      className={`text-xs font-extrabold px-3 py-1 rounded-full ${getStatusStyle(
                        status
                      )}`}
                    >
                      {status.toUpperCase()}
                    </div>

                    <div className="w-full md:w-[220px]">
                      <label className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
                        Update Status
                      </label>

                      <select
                        value={status}
                        disabled={updatingId === a._id}
                        onChange={(e) =>
                          handleStatusUpdate(a._id, e.target.value)
                        }
                        className="mt-2 w-full border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none bg-white dark:bg-[#0B0B0F]/40 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 disabled:opacity-60"
                      >
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    {updatingId === a._id && (
                      <p className="text-xs text-slate-400 font-semibold">
                        Updating status...
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterApplicants;
