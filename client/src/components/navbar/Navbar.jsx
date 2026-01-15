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
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  
  const fetchProfile = async () => {
    try {
      setLoadingUser(true);
      const res = await api.get("/users/profile");
      
      setUser(res.data.userFromToken); 
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
    const handleClickOutside = () => setIsProfileOpen(false);
    if (isProfileOpen) window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isProfileOpen]);

  const handleLogout = async () => {
    try {
      
      await api.post("/users/logout");
      navigate("/home");
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
       
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
            <Briefcase size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            Hire<span className="text-blue-600">Sync</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
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
            onClick={() => navigate("/recruiter/login")}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-blue-600 hover:text-blue-600 transition text-sm font-bold"
          >
            Post a Job
          </button>
        </nav>

        
        <div className="hidden md:flex items-center gap-4">
          {loadingUser ? (
            <div className="text-sm font-semibold text-gray-400">
              Checking...
            </div>
          ) : user ? (
            
            <div className="flex items-center gap-3">
             
              <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

             
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
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
                    className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Logged in as
                      </p>
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {user?.email || "User"}
                      </p>
                    </div>

                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      <User size={16} /> My Profile
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      <Settings size={16} /> Settings
                    </button>

                    <div className="h-px bg-gray-50 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
                className="text-sm font-bold text-gray-600 hover:text-gray-900 px-4"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-sm"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

    
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 p-4 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-4 font-semibold text-gray-600">
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
                setIsOpen(false);
                navigate("/recruiter/login");
              }}
              className="text-left text-blue-600 font-bold"
            >
              Post a Job
            </button>
          </nav>

          <div className="pt-4 border-t border-gray-50 flex flex-col gap-3">
            {loadingUser ? (
              <div className="text-sm text-gray-400 font-semibold">
                Checking...
              </div>
            ) : !user ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/login");
                  }}
                  className="w-full py-3 rounded-xl border border-gray-200 font-bold"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/register");
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
                className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-bold"
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
