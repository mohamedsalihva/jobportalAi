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

  //  job limit logic

  const jobLimit = recruiter?.user?.jobPostedLimit ?? 0;
  const jobsUsed = recruiter?.user?.jobPostedCount ?? 0;
  const isLimitReached =
  jobLimit > 0 && jobsUsed >= jobLimit;


 
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

      setJobStats({
        total: jobs.length,
        active: jobs.filter((j) => j.isActive).length,
        inactive: jobs.filter((j) => !j.isActive).length,
      });
    } catch {
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
          <div className="bg-white dark:bg-[#111218] border rounded-3xl p-10 text-center font-bold">
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
          <div className="bg-white dark:bg-[#111218] border rounded-3xl p-10 text-center">
            <Building2 className="mx-auto text-amber-500" size={40} />
            <h2 className="text-2xl font-semibold mt-4">
              Recruiter Profile Not Found
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Create your recruiter profile to start posting jobs.
            </p>

            <button
              onClick={() => navigate("/recruiter/create-profile")}
              className="mt-6 px-7 py-3.5 rounded-2xl bg-amber-500 font-semibold"
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
     
     
        <div className="bg-white dark:bg-[#111218] border rounded-3xl p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center font-bold text-xl">
              {companyInitial}
            </div>

            <div>
              <h1 className="text-2xl font-semibold">
                {recruiter.companyName}
              </h1>
              <p className="text-sm text-slate-500">
                {recruiter.companyLocation}
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              isLimitReached
                ? navigate("/recruiter/upgrade")
                : navigate("/recruiter/post-job")
            }
            className={`px-6 py-3 rounded-2xl font-semibold ${
              isLimitReached
                ? "bg-amber-500 "
                : "bg-amber-500 hover:bg-amber-400"
            }`}
          >
            <PlusCircle className="inline mr-2" size={18} />
            {isLimitReached ? "Upgrade" : "Post a Job"}
          </button>
        </div>

        

        <div className="bg-white dark:bg-[#111218] border rounded-3xl p-6">
          <p className="text-xs font-bold uppercase text-slate-400">
            Job Posting Limit
          </p>

          <div className="flex justify-between items-center mt-4">
            <p className="text-3xl font-semibold">
              {jobsUsed} / {jobLimit}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                isLimitReached
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {isLimitReached ? "Limit Reached" : "Available"}
            </span>
          </div>

          {isLimitReached && (
            <p className="mt-3 text-sm text-slate-600">
              Upgrade your plan to post more jobs.
            </p>
          )}
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Jobs" value={jobStats.total} icon={<Briefcase />} />
          <StatCard title="Active Jobs" value={jobStats.active} icon={<Users />} />
          <StatCard title="Inactive Jobs" value={jobStats.inactive} icon={<Briefcase />} />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title={isLimitReached ? "Upgrade Required" : "Post a Job"}
            desc={
              isLimitReached
                ? "Upgrade your plan to post more jobs."
                : "Create a new job posting."
            }
            icon={<PlusCircle />}
            onClick={() =>
              isLimitReached
                ? navigate("/recruiter/upgrade")
                : navigate("/recruiter/post-job")
            }
          />

          <ActionCard
            title="Manage Jobs"
            desc="Edit or close your job postings."
            icon={<Briefcase />}
            onClick={() => navigate("/recruiter/my-jobs")}
          />

          <ActionCard
            title="View Applicants"
            desc="Review job applicants."
            icon={<Users />}
            onClick={() => navigate("/recruiter/my-jobs")}
          />
        </div>

        
        <div className="bg-white dark:bg-[#111218] border rounded-3xl p-6 flex justify-between items-center">
          {recruiter.companyWebsite ? (
            <a
              href={recruiter.companyWebsite}
              target="_blank"
              rel="noreferrer"
              className="text-amber-600 font-semibold"
            >
              <Globe className="inline mr-2" />
              {recruiter.companyWebsite}
            </a>
          ) : (
            <p className="text-sm text-slate-500">No website added</p>
          )}

          <button
            onClick={() => navigate("/recruiter/profile")}
            className="px-6 py-3 rounded-2xl border font-semibold"
          >
            <Building2 className="inline mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;

//reusable components

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-[#111218] border rounded-3xl p-6">
    <div className="flex justify-between items-center">
      <p className="text-xs font-bold uppercase text-slate-400">{title}</p>
      <div className="text-amber-500">{icon}</div>
    </div>
    <p className="mt-4 text-4xl font-semibold">{value}</p>
  </div>
);

const ActionCard = ({ title, desc, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white dark:bg-[#111218] border rounded-3xl p-6 text-left hover:shadow-md transition"
  >
    <div className="text-amber-500">{icon}</div>
    <h2 className="mt-4 text-lg font-semibold">{title}</h2>
    <p className="text-sm text-slate-600 mt-2">{desc}</p>
    <p className="mt-4 text-sm font-semibold text-amber-600">Open →</p>
  </button>
);
