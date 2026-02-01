import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  User,
  LogOut,
  ChevronDown,
  Briefcase,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { toggleTheme, getTheme } from "../../utils/theme";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [theme, setTheme] = useState(getTheme());

  const role = user?.role;
  const isAdmin = role === "admin";

  const handleTheme = () => {
    setTheme(toggleTheme());
  };

  const fetchProfile = async () => {
    try {
      setLoadingUser(true);
      const res = await api.get("/users/profile", {
        withCredentials: true,
      });
      setUser(res.data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePostJobClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.get("/recruiter/profile");
      if (res.data?.data) {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/recruiter/create-profile");
      }
    } catch {
      navigate("/recruiter/create-profile");
    }
  };

  const handleLogout = async () => {
    await api.post("/users/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <div className="relative">
     
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center text-white">
              <Briefcase size={20} />
            </div>
            <span className="text-xl font-bold">
              Hire<span className="text-amber-500">Synnefo</span>
            </span>
          </div>

          
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            {!isAdmin && (
              <>
                <button onClick={() => navigate("/jobs")}>Find Jobs</button>
                <button>Companies</button>
                <button>Salary Guide</button>

                {user && (
                  <button
                    onClick={handlePostJobClick}
                    className="px-4 py-2 border rounded-xl font-bold"
                  >
                    Post Job
                  </button>
                )}
              </>
            )}
          </nav>

          
          <div className="flex items-center gap-4">
            <button onClick={handleTheme}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {loadingUser ? (
              <span className="text-gray-400">Checking...</span>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-amber-500 rounded-full text-white flex items-center justify-center text-xs font-bold">
                    {(user.name?.[0] || user.email?.[0]).toUpperCase()}
                  </div>
                  <ChevronDown size={14} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border rounded-xl shadow">
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full px-4 py-2 text-left flex gap-2"
                    >
                      <User size={16} /> Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left flex gap-2 text-red-600"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => navigate("/login")}>Sign in</button>
            )}
          </div>

          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b shadow-xl z-40">
          <div className="px-5 py-5 space-y-5 text-sm font-semibold">
           
            {!isAdmin && (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Explore
                </p>

                <button
                  onClick={() => {
                    navigate("/jobs");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <span>Find Jobs</span>
                  <span className="text-slate-400">→</span>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <span>Companies</span>
                  <span className="text-slate-400">→</span>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <span>Salary Guide</span>
                  <span className="text-slate-400">→</span>
                </button>

                
                {user && (
                  <button
                    onClick={() => {
                      handlePostJobClick();
                      setIsOpen(false);
                    }}
                    className="w-half mt-2 px-4 py-2 ml-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition"
                  >
                    Post a Job
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;