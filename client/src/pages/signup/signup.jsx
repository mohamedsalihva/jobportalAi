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
      alert(res.data.message || "Signup success");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}${API.AUTH.GOOGLE}`;
  };

  return (
    <div className="min-h-screen bg-[#f3f2f1] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-7">
        <h1 className="text-2xl font-extrabold text-gray-900 text-center">
          Create an account
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2">
          Start applying faster with ATS resume score evaluation.
        </p>

        <button
          onClick={handleGoogleSignup}
          className="w-full mt-5 flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 font-semibold hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 text-white py-3 font-bold transition"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
