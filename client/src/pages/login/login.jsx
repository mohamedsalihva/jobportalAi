import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../constants/apiEndpoints";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await api.get(API.USERS.PROFILE, { withCredentials: true });

        if (res.data?.userFromToken) {
          navigate("/jobs", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLoggedIn();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await api.post(
        API.AUTH.LOGIN,
        { email, password },
        { withCredentials: true }
      );

      const role = res.data?.user?.role;

      if (!role) {
        alert(res.data?.message || "Login failed");
        return;
      }

      if (role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (role === "recruiter")
        navigate("/recruiter/dashboard", { replace: true });
      else navigate("/jobs", { replace: true });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}${API.AUTH.GOOGLE}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-lg p-7">
      
        <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
          Sign in
        </h2>

        <p className="text-center text-sm text-slate-600 dark:text-slate-300 leading-5 mb-6">
          Welcome back! Please login to continue.
        </p>

      
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Email address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none bg-white dark:bg-[#0B0B0F] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
          />
        </div>

        
        <div className="mb-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none bg-white dark:bg-[#0B0B0F] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
          />
        </div>

        
        <div className="flex justify-end mb-5">
          <button className="text-sm text-amber-600 dark:text-amber-400 font-semibold hover:underline">
            Forgot password?
          </button>
        </div>

        
        <button
          onClick={handleLogin}
          className="w-full bg-amber-500 hover:bg-amber-400 text-black py-3 rounded-xl font-bold transition active:scale-[0.98]"
        >
          Continue
        </button>

      
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10" />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            or
          </span>
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10" />
        </div>

        
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/10 transition active:scale-[0.98]"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

    
        <p className="text-center text-sm text-slate-700 dark:text-slate-300 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
