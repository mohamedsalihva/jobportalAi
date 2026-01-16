import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await api.get("/users/profile", { withCredentials: true });

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
        "/auth/login",
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
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg p-7">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
          Sign in
        </h2>

        <p className="text-center text-sm text-gray-600 leading-5 mb-6">
          Welcome back! Please login to continue.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2557a7] focus:ring-2 focus:ring-[#2557a7]/20"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2557a7] focus:ring-2 focus:ring-[#2557a7]/20"
          />
        </div>

        <div className="flex justify-end mb-5">
          <button className="text-sm text-[#2557a7] font-semibold hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#2557a7] text-white py-3 rounded-xl font-bold hover:bg-[#1f4c94] transition"
        >
          Continue
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-sm text-gray-600">or</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 bg-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-700 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-bold text-blue-700 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
