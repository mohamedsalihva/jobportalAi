import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      
      <section className="relative overflow-hidden">
       
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />
          <div className="absolute top-20 -right-24 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[240px] bg-gradient-to-r from-blue-100/60 via-white to-indigo-100/60 blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-14 pb-10">
          
          <div className="text-center max-w-3xl mx-auto">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              ⚡ AI-powered job matching & resume ATS insights
            </p>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Your next opportunity starts with{" "}
              <span className="text-blue-600">HireSync</span>
            </h1>

            <p className="mt-4 text-gray-600 text-base md:text-lg">
              A modern job portal for job seekers and recruiters — with smart job
              search, secure authentication, and AI resume evaluation.
            </p>
          </div>

          
          <div className="max-w-5xl mx-auto mt-10">
            <div className="bg-white/90 backdrop-blur border border-gray-200 shadow-lg rounded-2xl p-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                
                <div className="flex items-center gap-3 w-full md:flex-1 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
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
                    <p className="text-[11px] font-semibold text-gray-500">
                      Job title / skills
                    </p>
                    <input
                      type="text"
                      placeholder="e.g. React Developer, Node.js"
                      className="w-full outline-none text-sm font-medium text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                
                <div className="flex items-center gap-3 w-full md:w-[35%] rounded-xl border border-gray-200 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-600"
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
                    <p className="text-[11px] font-semibold text-gray-500">
                      Location
                    </p>
                    <input
                      type="text"
                      placeholder="Kerala, Remote"
                      className="w-full outline-none text-sm font-medium text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                
                <button className="w-full md:w-[190px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-4 transition shadow-sm flex items-center justify-center gap-2">
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
                <span className="text-xs text-gray-500 font-medium">
                  Popular:
                </span>

                <button className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">
                  React
                </button>
                <button className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">
                  Node.js
                </button>
                <button className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">
                  UI/UX
                </button>
                <button className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">
                  Data Analyst
                </button>
              </div>
            </div>
          </div>

          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <button
              onClick={() => navigate("/signup")}
              className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-sm"
            >
              Create Free Account
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3 rounded-xl bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 font-semibold transition"
            >
              Sign In
            </button>
          </div>

         
          <div className="max-w-5xl mx-auto mt-10">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5h18M3 12h18M3 19h18"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">10k+</p>
                    <p className="text-xs text-gray-500">Job listings</p>
                  </div>
                </div>

                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 21v-2a4 4 0 0 0-3-3.87"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 3a4 4 0 0 1 0 8"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">2k+</p>
                    <p className="text-xs text-gray-500">Recruiters</p>
                  </div>
                </div>

                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
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
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">AI</p>
                    <p className="text-xs text-gray-500">Resume scoring</p>
                  </div>
                </div>

                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
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
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Fast</p>
                    <p className="text-xs text-gray-500">Quick apply flow</p>
                  </div>
                </div>
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
          <p className="text-gray-600 mt-3">
            HireSync gives a modern hiring experience with AI resume evaluation
            and professional job management tools.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-3xl p-7 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">
              🔎
            </div>
            <h3 className="mt-4 font-bold text-lg">Smart Job Search</h3>
            <p className="mt-2 text-sm text-gray-600">
              Search opportunities by skills, job role, and location with clean
              filters.
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-7 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl">
              📄
            </div>
            <h3 className="mt-4 font-bold text-lg">ATS Resume Scoring</h3>
            <p className="mt-2 text-sm text-gray-600">
              Generate AI insights and match score before applying.
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-7 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-xl">
              🧑‍💼
            </div>
            <h3 className="mt-4 font-bold text-lg">Recruiter Dashboard</h3>
            <p className="mt-2 text-sm text-gray-600">
              Recruiters can post, update, and manage job applications easily.
            </p>
          </div>
        </div>
      </section>

     
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold">
              Ready to grow with HireSync?
            </h3>
            <p className="text-white/90 mt-2 text-sm">
              Create your free account and unlock personalised job recommendations.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold hover:bg-gray-100 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-xl border border-white/40 hover:bg-white/10 font-semibold transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      
      <footer className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h4 className="text-lg font-bold">
                Hire<span className="text-blue-600">Sync</span>
              </h4>
              <p className="text-sm text-gray-600 mt-2 max-w-sm">
                A professional AI powered job portal designed to improve job search
                and simplify hiring with resume intelligence.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-900">Platform</p>
                <div className="mt-2 space-y-2 text-gray-600">
                  <p className="hover:text-blue-600 cursor-pointer">Jobs</p>
                  <p className="hover:text-blue-600 cursor-pointer">Companies</p>
                  <p className="hover:text-blue-600 cursor-pointer">Recruiters</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Resources</p>
                <div className="mt-2 space-y-2 text-gray-600">
                  <p className="hover:text-blue-600 cursor-pointer">Help</p>
                  <p className="hover:text-blue-600 cursor-pointer">Career Tips</p>
                  <p className="hover:text-blue-600 cursor-pointer">Support</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Legal</p>
                <div className="mt-2 space-y-2 text-gray-600">
                  <p className="hover:text-blue-600 cursor-pointer">Privacy</p>
                  <p className="hover:text-blue-600 cursor-pointer">Terms</p>
                  <p className="hover:text-blue-600 cursor-pointer">Security</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} HireSync. All rights reserved.</p>
            <p className="text-gray-400">
              Built with React + Tailwind + Node.js + MongoDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
