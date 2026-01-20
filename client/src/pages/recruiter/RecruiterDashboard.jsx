import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";

const RecruiterDashboard = () => {
  const [recruiter, setRecruiter] = useState(null);
  const [loading, setLoading] = useState(true);

  const [jobStats, setJobStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const navigate = useNavigate();

  const fetchRecruiterProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/recruiter/profile");
      setRecruiter(res.data.data);
    } catch (err) {
      setRecruiter(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyJobStats = async () => {
    try {
      const res = await api.get("/jobs/my-jobs");
      const jobs = res.data.jobs || [];

      const total = jobs.length;
      const active = jobs.filter((j) => j.isActive === true).length;
      const inactive = jobs.filter((j) => j.isActive === false).length;

      setJobStats({ total, active, inactive });
    } catch (error) {
      // if backend fails, keep stats 0 (scalable safe fallback)
      setJobStats({ total: 0, active: 0, inactive: 0 });
    }
  };

  useEffect(() => {
    fetchRecruiterProfile();
    fetchMyJobStats();
  }, []);

  const companyInitial = useMemo(() => {
    return (
      recruiter?.companyName?.[0]?.toUpperCase() ||
      recruiter?.user?.name?.[0]?.toUpperCase() ||
      "R"
    );
  }, [recruiter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFE]">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center font-bold text-slate-500">
            Loading recruiter dashboard...
          </div>
        </div>
      </div>
    );
  }

  // ✅ If recruiter profile is missing
  if (!recruiter) {
    return (
      <div className="min-h-screen bg-[#FBFBFE]">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-extrabold text-slate-900">
              Recruiter Profile Not Found
            </h2>
            <p className="text-slate-600 mt-2">
              Create your recruiter profile to post jobs and manage applicants.
            </p>
            <button
              onClick={() => navigate("/recruiter/create-profile")}
              className="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
            >
              Create Recruiter Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFE]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {/* ✅ Header Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-200">
              {companyInitial}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {recruiter.companyName}
              </h1>

              <p className="text-sm text-slate-600 mt-1">
                {recruiter.companyLocation || "Company location not added"}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {recruiter.industry || "Industry not set"}
                </span>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    recruiter.isVerified
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }`}
                >
                  {recruiter.isVerified ? "Verified Recruiter ✅" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/recruiter/post-job")}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
            >
              + Post a Job
            </button>

            <button
              onClick={() => navigate("/recruiter/my-jobs")}
              className="px-6 py-3 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition"
            >
              View My Jobs
            </button>
          </div>
        </div>

        {/* ✅ Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total Jobs
            </p>
            <p className="mt-3 text-3xl font-extrabold text-slate-900">
              {jobStats.total}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              All posted jobs
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Active Jobs
            </p>
            <p className="mt-3 text-3xl font-extrabold text-emerald-700">
              {jobStats.active}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Jobs currently visible
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Inactive Jobs
            </p>
            <p className="mt-3 text-3xl font-extrabold text-red-600">
              {jobStats.inactive}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Hidden / closed jobs
            </p>
          </div>
        </div>

        {/* ✅ Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/recruiter/post-job"
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
          >
            <h2 className="text-lg font-extrabold text-slate-900">
              ➕ Post a Job
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Create a new job posting in minutes.
            </p>
          </Link>

          <Link
            to="/recruiter/my-jobs"
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
          >
            <h2 className="text-lg font-extrabold text-slate-900">
              📄 Manage Jobs
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Edit, delete, activate or close jobs.
            </p>
          </Link>

          <Link
            to="/recruiter/my-jobs"
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
          >
            <h2 className="text-lg font-extrabold text-slate-900">
              👥 View Applicants
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Review applicants job-wise & shortlist them.
            </p>
          </Link>
        </div>

        {/* ✅ Website Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Company Website
          </p>

          {recruiter.companyWebsite ? (
            <a
              href={recruiter.companyWebsite}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-blue-600 font-extrabold hover:underline"
            >
              {recruiter.companyWebsite}
            </a>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              No website added yet.
            </p>
          )}

          <button
            onClick={() => navigate("/recruiter/create-profile")}
            className="mt-4 px-5 py-2.5 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
