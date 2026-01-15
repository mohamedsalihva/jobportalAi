import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
            H
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Hire<span className="text-blue-600">Sync</span>
          </h1>
        </div>

        
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-700">
          <button className="hover:text-blue-600 transition">
            Find Jobs
          </button>
          <button className="hover:text-blue-600 transition">
            Companies
          </button>
          <button className="hover:text-blue-600 transition">
            Salary Guide
          </button>
          <button className="hover:text-blue-600 transition">
            Recruiters
          </button>
        </nav>

        
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Sign in
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
          >
            Get Started
          </button>
        </div>

        
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
        >
          {!open ? (
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm font-semibold text-gray-700">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/");
              }}
              className="py-2 hover:text-blue-600 transition text-left"
            >
              Find Jobs
            </button>

            <button
              onClick={() => setOpen(false)}
              className="py-2 hover:text-blue-600 transition text-left"
            >
              Companies
            </button>

            <button
              onClick={() => setOpen(false)}
              className="py-2 hover:text-blue-600 transition text-left"
            >
              Salary Guide
            </button>

            <button
              onClick={() => setOpen(false)}
              className="py-2 hover:text-blue-600 transition text-left"
            >
              Recruiters
            </button>

            <div className="pt-3 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="w-full px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition"
              >
                Sign in
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/signup");
                }}
                className="w-full px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
