import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { API } from "../../constants/apiEndpoints";
import api from "../../api/axios";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await api.get(API.USERS.PROFILE, { withCredentials: true });
        if (res.data?.userFromToken) {
          navigate("/jobs", { replace: true });
        }
      } catch (error) {
        console.log("user not login");
      }
    };
    checkLoggedIn();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0B0B0F] dark:text-white">
      <Navbar />

      
      <section className="relative overflow-hidden">
        
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-200/40 dark:bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 -right-24 w-72 h-72 bg-orange-200/40 dark:bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[240px] bg-gradient-to-r from-amber-100/60 via-white to-orange-100/60 dark:from-amber-500/10 dark:via-transparent dark:to-orange-500/10 blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-14 pb-10">
          
          <div className="text-center max-w-3xl mx-auto">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300">
              ⚡ AI-powered job matching & resume ATS insights
            </p>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Your next opportunity starts with{" "}
              <span className="text-amber-500 dark:text-amber-400">
                HireSynnefo
              </span>
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-300 text-base md:text-lg">
              A modern job portal for job seekers and recruiters — with smart
              job search, secure authentication, and AI resume evaluation.
            </p>
          </div>

          
          <div className="max-w-5xl mx-auto mt-10">
            <div className="bg-white/90 dark:bg-white/5 backdrop-blur border border-slate-200 dark:border-white/10 shadow-lg rounded-2xl p-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                
                <div className="flex items-center gap-3 w-full md:flex-1 rounded-xl border border-slate-200 dark:border-white/10 px-4 py-3 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200/50 dark:focus-within:ring-amber-500/20 transition bg-white dark:bg-transparent">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-amber-600 dark:text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-4.3-4.3m1.3-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>

                  <div className="w-full">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Job title / skills
                    </p>
                    <input
                      type="text"
                      placeholder="e.g. React Developer, Node.js"
                      className="w-full outline-none text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent"
                    />
                  </div>
                </div>

              
                <div className="flex items-center gap-3 w-full md:w-[35%] rounded-xl border border-slate-200 dark:border-white/10 px-4 py-3 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200/50 dark:focus-within:ring-amber-500/20 transition bg-white dark:bg-transparent">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-amber-600 dark:text-amber-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                      />
                    </svg>
                  </div>

                  <div className="w-full">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Location
                    </p>
                    <input
                      type="text"
                      placeholder="Kerala, Remote"
                      className="w-full outline-none text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent"
                    />
                  </div>
                </div>

            
                <button className="w-full md:w-[170px] rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm px-5 py-3 transition shadow-sm flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.3-4.3m1.3-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  Search jobs
                </button>
              </div>

              
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Popular:
                </span>

                {["React", "Node.js", "UI/UX", "Data Analyst"].map((tag) => (
                  <button
                    key={tag}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 px-3 py-1 rounded-full transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition shadow-sm"
            >
              Create Free Account
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 font-semibold text-sm transition text-slate-900 dark:text-white"
            >
              Sign In
            </button>
          </div>

          
          <div className="max-w-5xl mx-auto mt-10">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm px-6 py-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  {
                    title: "10k+",
                    subtitle: "Job listings",
                    iconBg: "bg-amber-50 dark:bg-white/10",
                    iconColor: "text-amber-600 dark:text-amber-300",
                    path: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5h18M3 12h18M3 19h18"
                      />
                    ),
                  },
                  {
                    title: "2k+",
                    subtitle: "Recruiters",
                    iconBg: "bg-orange-50 dark:bg-white/10",
                    iconColor: "text-orange-600 dark:text-orange-300",
                    path: (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                        />
                      </>
                    ),
                  },
                  {
                    title: "AI",
                    subtitle: "Resume scoring",
                    iconBg: "bg-emerald-50 dark:bg-white/10",
                    iconColor: "text-emerald-600 dark:text-emerald-300",
                    path: (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                        />
                      </>
                    ),
                  },
                  {
                    title: "Fast",
                    subtitle: "Quick apply flow",
                    iconBg: "bg-amber-50 dark:bg-white/10",
                    iconColor: "text-amber-600 dark:text-amber-300",
                    path: (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </>
                    ),
                  },
                ].map((card, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}
                    >
                      <svg
                        className={`w-5 h-5 ${card.iconColor}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        {card.path}
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {card.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Built for job seekers & recruiters
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-3">
            HireSynnefo gives a modern hiring experience with AI resume evaluation
            and professional job management tools.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔎",
              title: "Smart Job Search",
              desc: "Search opportunities by skills, job role, and location with clean filters.",
              bg: "bg-amber-50 dark:bg-white/10",
            },
            {
              icon: "📄",
              title: "ATS Resume Scoring",
              desc: "Generate AI insights and match score before applying.",
              bg: "bg-orange-50 dark:bg-white/10",
            },
            {
              icon: "🧑‍💼",
              title: "Recruiter Dashboard",
              desc: "Recruiters can post, update, and manage job applications easily.",
              bg: "bg-emerald-50 dark:bg-white/10",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-7 hover:shadow-md transition"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center text-xl`}
              >
                {f.icon}
              </div>
              <h3 className="mt-4 font-bold text-lg text-slate-900 dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-10 text-black flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold">
              Ready to grow with HireSync?
            </h3>
            <p className="text-black/70 mt-2 text-sm">
              Create your free account and unlock personalised job
              recommendations.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2.5 rounded-xl bg-black text-amber-300 font-semibold text-sm hover:bg-slate-900 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 rounded-xl border border-black/30 hover:bg-black/10 font-semibold text-sm transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      
      <footer className="border-t border-slate-200 dark:border-white/10 bg-gray-50 dark:bg-[#0B0B0F]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Hire
                <span className="text-amber-500 dark:text-amber-400">Synnefo</span>
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-sm">
                A professional AI powered job portal designed to improve job
                search and simplify hiring with resume intelligence.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
              {[
                {
                  title: "Platform",
                  links: ["Jobs", "Companies", "Recruiters"],
                },
                {
                  title: "Resources",
                  links: ["Help", "Career Tips", "Support"],
                },
                {
                  title: "Legal",
                  links: ["Privacy", "Terms", "Security"],
                },
              ].map((col) => (
                <div key={col.title}>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {col.title}
                  </p>
                  <div className="mt-2 space-y-2 text-slate-600 dark:text-slate-300">
                    {col.links.map((l) => (
                      <p
                        key={l}
                        className="hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
                      >
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} HireSynnefo. All rights reserved.</p>
            <p className="text-slate-400">
              Built with React + Tailwind + Node.js + MongoDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
