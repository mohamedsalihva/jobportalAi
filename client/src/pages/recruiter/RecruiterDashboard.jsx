import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import { API } from "../../constants/apiEndpoints";

import {
  Briefcase,
  Users,
  PlusCircle,
  Building2,
  Globe,
  MapPin,
  LayoutGrid,
} from "lucide-react";

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
      const res = await api.get(API.RECRUITER.MY_PROFILE);
      setRecruiter(res.data.data);
    } catch (err) {
      setRecruiter(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyJobStats = async () => {
    try {
      const res = await api.get(API.JOBS.MY_JOBS);
      const jobs = res.data.jobs || [];

      const total = jobs.length;
      const active = jobs.filter((j) => j.isActive === true).length;
      const inactive = jobs.filter((j) => j.isActive === false).length;

      setJobStats({ total, active, inactive });
    } catch (error) {
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
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center font-bold text-slate-500">
            Loading recruiter dashboard...
          </div>
        </div>
      </div>
    );
  }

  if (!recruiter) {
    return (
      <div className="min-h-screen bg-[#FBFBFE]">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center">
              <Building2 className="text-blue-700" />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-4">
              Recruiter Profile Not Found
            </h2>

            <p className="text-slate-600 mt-2 max-w-xl mx-auto">
              Create your recruiter profile to post jobs, manage applicants, and
              track hiring progress.
            </p>

            <button
              onClick={() => navigate("/recruiter/create-profile")}
              className="mt-6 px-7 py-3.5 rounded-2xl bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
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

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-indigo-50" />

          <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-200">
                {companyInitial}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {recruiter.companyName}
                  </h1>

                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                      recruiter.isVerified
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}
                  >
                    {recruiter.isVerified ? "Verified ✅" : "Not Verified"}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>
                      {recruiter.companyLocation || "Location not added"}
                    </span>
                  </div>

                  <span className="text-slate-300">•</span>

                  <div className="flex items-center gap-1">
                    <LayoutGrid size={16} />
                    <span>{recruiter.industry || "Industry not set"}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  Manage jobs, shortlist applicants, and track hiring in one
                  place.
                </p>
              </div>
            </div>

          
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/recruiter/post-job")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
              >
                <PlusCircle size={18} />
                Post a Job
              </button>

              <button
                onClick={() => navigate("/recruiter/my-jobs")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-200 bg-white font-extrabold hover:bg-slate-50 transition"
              >
                <Briefcase size={18} />
                View My Jobs
              </button>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Jobs"
            value={jobStats.total}
            subtitle="All job postings"
            icon={<Briefcase size={18} />}
          />

          <StatCard
            title="Active Jobs"
            value={jobStats.active}
            subtitle="Visible to job seekers"
            icon={<Users size={18} />}
            valueClass="text-emerald-700"
          />

          <StatCard
            title="Inactive Jobs"
            value={jobStats.inactive}
            subtitle="Closed / hidden jobs"
            icon={<Briefcase size={18} />}
            valueClass="text-red-600"
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Post a Job"
            desc="Create a new job posting in minutes."
            icon={<PlusCircle />}
            onClick={() => navigate("/recruiter/post-job")}
          />

          <ActionCard
            title="Manage Jobs"
            desc="Edit, delete, activate or close jobs."
            icon={<Briefcase />}
            onClick={() => navigate("/recruiter/my-jobs")}
          />

          <ActionCard
            title="View Applicants"
            desc="Review applicants job-wise & shortlist them."
            icon={<Users />}
            onClick={() => navigate("/recruiter/my-jobs")}
          />
        </div>

        {/*  Company website card */}

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                Company Website
              </p>

              {recruiter.companyWebsite ? (
                <a
                  href={recruiter.companyWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-blue-700 font-extrabold hover:underline"
                >
                  <Globe size={18} />
                  {recruiter.companyWebsite}
                </a>
              ) : (
                <p className="mt-3 text-sm text-slate-600">
                  No website added yet.
                </p>
              )}
            </div>

            <button
              onClick={() => navigate("/recruiter/profile")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 font-extrabold hover:bg-slate-50 transition"
            >
              <Building2 size={18} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;



const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  valueClass = "text-slate-900",
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
          {title}
        </p>
        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
          {icon}
        </div>
      </div>

      <p className={`mt-4 text-4xl font-extrabold ${valueClass}`}>{value}</p>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
    </div>
  );
};

const ActionCard = ({ title, desc, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition hover:-translate-y-[1px]"
    >
      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-700">
        {icon}
      </div>

      <h2 className="mt-4 text-lg font-extrabold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>

      <p className="mt-4 text-sm font-extrabold text-blue-700">Open →</p>
    </button>
  );
};
