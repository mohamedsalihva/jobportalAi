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
      setUser(res.data?.userFromToken || null);
    } catch {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFindJobsClick = () => {
    navigate("/jobs");
  };

  const handlePostJobClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // ask backend: do I already have recruiter profile?
      const res = await api.get("/recruiter/profile");

      if (res.data?.data) {
        // recruiter exists
        navigate("/recruiter/dashboard");
      } else {
        // recruiter not created yet
        navigate("/recruiter/create-profile");
      }
    } catch (error) {
      navigate("/recruiter/create-profile");
    }
  };

  const handleLogout = async () => {
    await api.post("/users/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
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
         
         {/*for non admin users */}

          {!isAdmin && (
            <>
              <button onClick={() => navigate("/jobs")}>Find Jobs</button>
              <button>Companies</button>
              <button>Salary Guide</button>

              {/* Post Job for logged-in non-admin users */}
              
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
                    className="w-full px-4 py-2 text-left"
                  >
                    <User size={16} /> Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600"
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
  );
};

export default Navbar;
