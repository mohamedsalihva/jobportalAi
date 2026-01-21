import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import { API } from "../../constants/apiEndpoints";

const RecruiterCreateProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    companyLocation: "",
    companyWebsite: "",
    industry: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(API.RECRUITER.CREATE, form);

      alert("Recruiter profile created ✅");
      navigate("/recruiter/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Profile creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-7 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Create Recruiter Profile
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Fill your company details to start posting jobs.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* ✅ Company Name */}
            <div>
              <label className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
                Company Name
              </label>
              <input
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
                placeholder="TCS / Infosys / Startup Name"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0B0F]/40 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition"
              />
            </div>

            {/* ✅ Company Location */}
            <div>
              <label className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
                Company Location
              </label>
              <input
                value={form.companyLocation}
                onChange={(e) =>
                  setForm({ ...form, companyLocation: e.target.value })
                }
                placeholder="Kochi, Kerala"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0B0F]/40 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition"
              />
            </div>

            {/* ✅ Company Website */}
            <div>
              <label className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
                Company Website{" "}
                <span className="text-xs font-bold text-slate-400">
                  (optional)
                </span>
              </label>
              <input
                value={form.companyWebsite}
                onChange={(e) =>
                  setForm({ ...form, companyWebsite: e.target.value })
                }
                placeholder="https://company.com"
                className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0B0F]/40 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition"
              />
            </div>

            {/* ✅ Industry */}
            <div>
              <label className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
                Industry{" "}
                <span className="text-xs font-bold text-slate-400">
                  (optional)
                </span>
              </label>
              <input
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                placeholder="IT / Finance / Healthcare"
                className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0B0F]/40 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 transition"
              />
            </div>

            {/* ✅ Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3.5 transition disabled:opacity-60 shadow-md shadow-amber-500/20"
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>

            {/* ✅ Extra note */}
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              You can edit these details anytime from <b>Recruiter Profile</b>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecruiterCreateProfile;
