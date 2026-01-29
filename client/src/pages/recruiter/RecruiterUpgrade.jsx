import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { CheckCircle } from "lucide-react";


const RecruiterUpgrade = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-14">
        
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Upgrade Your Hiring Power 🚀
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            You’ve reached your free job posting limit. Upgrade to continue hiring.
          </p>
        </div>

        {/* Plans */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Free Plan */}

          <div className="bg-white dark:bg-[#111218] border rounded-3xl p-8">
            <h2 className="text-xl font-bold">Free Plan</h2>
            <p className="text-sm text-slate-500 mt-1">Current Plan</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                3 Job Posts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                Basic visibility
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                ✖ No priority listing
              </li>
            </ul>

            <button
              disabled
              className="mt-8 w-full py-3 rounded-2xl bg-slate-200 dark:bg-white/10 font-bold cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/*pro plan */}

          <div className="bg-white dark:bg-[#111218] border-2 border-amber-500 rounded-3xl p-8 relative">
            <span className="absolute -top-3 right-6 bg-amber-500 text-black text-xs font-extrabold px-3 py-1 rounded-full">
              RECOMMENDED
            </span>

            <h2 className="text-xl font-bold">Pro Plan</h2>
            <p className="text-sm text-slate-500 mt-1">
              Best for growing teams
            </p>

            <p className="mt-4 text-3xl font-extrabold">
              ₹499 <span className="text-sm font-semibold">/ month</span>
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                Unlimited Job Posts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                Priority job listing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                Faster applicant reach
              </li>
            </ul>

            <button
              onClick={() => navigate("/recruiter/upgrade/confirm")}
              className="mt-8 w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold transition"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>

        
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/recruiter/dashboard")}
            className="text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-300"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterUpgrade;
