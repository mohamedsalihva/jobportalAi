import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { API } from "../../constants/apiEndpoints";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post(API.AUTH.SIGNUP, form);

      alert(res.data.message || "Signup success ✅");
      navigate("/login", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}${API.AUTH.GOOGLE}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-white/5 rounded-2xl shadow-lg border border-slate-200 dark:border-white/10 p-7">
    
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center">
          Create an account
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 text-center mt-2">
          Start applying faster with ATS resume score evaluation.
        </p>

      
        <button
          onClick={handleGoogleSignup}
          className="w-full mt-5 flex items-center justify-center gap-3 border border-slate-300 dark:border-white/10 rounded-xl py-3 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 transition active:scale-[0.98]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        
        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            OR
          </span>
          <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
        </div>

        
        <form onSubmit={handleSignup} className="space-y-4">
          
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Full name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="mt-2 w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B0B0F] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            />
          </div>

          
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Email address
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-2 w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B0B0F] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            />
          </div>

          
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              className="mt-2 w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B0B0F] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            />
          </div>

          
          <button
            disabled={loading}
            className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-black py-3 font-bold transition disabled:opacity-60 active:scale-[0.98]"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        
        <p className="text-sm text-center text-slate-700 dark:text-slate-300 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
