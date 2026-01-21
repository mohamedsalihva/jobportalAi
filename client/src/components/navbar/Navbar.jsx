import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";
import {
  User,
  LogOut,
  ChevronDown,
  Settings,
  Briefcase,
  Bell,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import { toggleTheme, getTheme } from "../../utils/theme";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ✅ Theme state (single source)
  const [theme, setTheme] = useState(getTheme());

  const handleTheme = () => {
    const newTheme = toggleTheme(); // returns "dark" or "light"
    setTheme(newTheme);
  };

  const fetchProfile = async () => {
    try {
      setLoadingUser(true);
      const res = await api.get("/users/profile", { withCredentials: true });
      setUser(res.data?.userFromToken || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [location.pathname]);

  useEffect(() => {
    if (user && (location.pathname === "/" || location.pathname === "/login")) {
      navigate("/jobs", { replace: true });
    }
  }, [user, location.pathname, navigate]);

  useEffect(() => {
    const handleClickOutside = () => setIsProfileOpen(false);

    if (isProfileOpen) window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isProfileOpen]);

  const handleLogout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-100 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
            <Briefcase size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            Hire<span className="text-amber-500">Synnefo</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500 dark:text-slate-300">
          <button
            onClick={() => navigate("/jobs")}
            className="hover:text-blue-600 transition-colors"
          >
            Find Jobs
          </button>
          <button className="hover:text-blue-600 transition-colors">
            Companies
          </button>
          <button className="hover:text-blue-600 transition-colors">
            Salary Guide
          </button>

          <button
            onClick={() => {
              if (!user) return navigate("/login");

              if (user.role !== "recruiter") return navigate("/recruiter/profile");

              navigate("/recruiter/dashboard");
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 transition text-sm font-bold"
          >
            Post a Job
          </button>
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
       
          <button
            onClick={handleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {loadingUser ? (
            <div className="text-sm font-semibold text-gray-400">Checking...</div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
              </button>

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-100 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-slate-900 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                    {(user?.name?.[0] || user?.email?.[0] || "U").toUpperCase()}
                  </div>

                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-950 border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl py-2 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-50 dark:border-white/10">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Logged in as
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {user?.email || "User"}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
                    >
                      <User size={16} /> My Profile
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                      <Settings size={16} /> Settings
                    </button>

                    <div className="h-px bg-gray-50 dark:bg-white/10 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-bold text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white px-4"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-900 dark:bg-white text-white dark:text-slate-900 hover:bg-gray-800 dark:hover:bg-slate-200 transition-all shadow-sm"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 dark:text-slate-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-gray-50 dark:border-white/10 p-4 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-4 font-semibold text-gray-600 dark:text-slate-300">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/jobs");
              }}
              className="text-left"
            >
              Find Jobs
            </button>
            <button className="text-left">Companies</button>
            <button className="text-left">Salary Guide</button>

            <button
              onClick={() => {
                if (!user) return navigate("/login");

                if (user.role !== "recruiter")
                  return navigate("/recruiter/create-profile");

                navigate("/recruiter/dashboard");
              }}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 transition text-sm font-bold"
            >
              Post a Job
            </button>
          </nav>

          <div className="pt-4 border-t border-gray-50 dark:border-white/10 flex flex-col gap-3">
            <button
              onClick={handleTheme}
              className="w-full py-3 rounded-xl border border-gray-200 dark:border-white/10 font-bold flex items-center justify-center gap-2"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            {loadingUser ? (
              <div className="text-sm text-gray-400 font-semibold">Checking...</div>
            ) : !user ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/login");
                  }}
                  className="w-full py-3 rounded-xl border border-gray-200 dark:border-white/10 font-bold"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/signup");
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold"
                >
                  Get Started
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full py-3 rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 font-bold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
