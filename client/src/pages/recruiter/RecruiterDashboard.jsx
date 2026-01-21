import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center font-extrabold text-slate-500 dark:text-slate-300">
            Loading recruiter dashboard...
          </div>
        </div>
      </div>
    );
  }

  if (!recruiter) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
              <Building2 className="text-amber-600 dark:text-amber-400" />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mt-4">
              Recruiter Profile Not Found
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-xl mx-auto text-sm leading-relaxed">
              Create your recruiter profile to post jobs, manage applicants, and
              track hiring progress.
            </p>

            <button
              onClick={() => navigate("/recruiter/create-profile")}
              className="mt-6 px-7 py-3.5 rounded-2xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
            >
              Create Recruiter Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111218] shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-white to-yellow-50 dark:from-white/5 dark:via-transparent dark:to-white/5" />

          <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-500 flex items-center justify-center text-black font-extrabold text-xl shadow-md shadow-amber-500/30 dark:shadow-none">
                {companyInitial}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {recruiter.companyName}
                  </h1>

                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                      recruiter.isVerified
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-500/20"
                    }`}
                  >
                    {recruiter.isVerified ? "Verified ✅" : "Not Verified"}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{recruiter.companyLocation || "Location not added"}</span>
                  </div>

                  <span className="text-slate-300 dark:text-white/20">•</span>

                  <div className="flex items-center gap-1">
                    <LayoutGrid size={16} />
                    <span>{recruiter.industry || "Industry not set"}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Manage jobs, shortlist applicants, and track hiring in one place.
                </p>
              </div>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/recruiter/post-job")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
              >
                <PlusCircle size={18} />
                Post a Job
              </button>

              <button
                onClick={() => navigate("/recruiter/my-jobs")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition"
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
            valueClass="text-emerald-700 dark:text-emerald-300"
          />

          <StatCard
            title="Inactive Jobs"
            value={jobStats.inactive}
            subtitle="Closed / hidden jobs"
            icon={<Briefcase size={18} />}
            valueClass="text-red-600 dark:text-red-300"
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

       

        <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
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
                  className="mt-3 inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                >
                  <Globe size={18} />
                  {recruiter.companyWebsite}
                </a>
              ) : (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  No website added yet.
                </p>
              )}
            </div>

            <button
              onClick={() => navigate("/recruiter/profile")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition"
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
  valueClass = "text-slate-900 dark:text-white",
}) => {
  return (
    <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
          {title}
        </p>

        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
          {icon}
        </div>
      </div>

      <p className={`mt-4 text-4xl font-semibold tracking-tight ${valueClass}`}>
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        {subtitle}
      </p>
    </div>
  );
};

const ActionCard = ({ title, desc, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition hover:-translate-y-[1px]"
    >
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
        {icon}
      </div>

      <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>

      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
        {desc}
      </p>

      <p className="mt-4 text-sm font-semibold text-amber-600 dark:text-amber-400">
        Open →
      </p>
    </button>
  );
};
