import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";

const RecruiterCreateProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    companyLocation: "",
    companyWebsite: "",
    industry: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/recruiter/profile", form);

      alert("Recruiter profile created");
      navigate("/recruiter/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Profile creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Create Recruiter Profile
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Fill your company details to start posting jobs.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
           
            <div>
              <label className="text-sm font-bold text-slate-700">
                Company Name
              </label>
              <input
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                placeholder="TCS / Infosys / Startup Name"
                required
              />
            </div>

          
            <div>
              <label className="text-sm font-bold text-slate-700">
                Company Location
              </label>
              <input
                value={form.companyLocation}
                onChange={(e) =>
                  setForm({ ...form, companyLocation: e.target.value })
                }
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                placeholder="Kochi, Kerala"
                required
              />
            </div>

            
            <div>
              <label className="text-sm font-bold text-slate-700">
                Company Website (optional)
              </label>
              <input
                value={form.companyWebsite}
                onChange={(e) =>
                  setForm({ ...form, companyWebsite: e.target.value })
                }
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                placeholder="https://company.com"
              />
            </div>

           
            <div>
              <label className="text-sm font-bold text-slate-700">
                Industry (optional)
              </label>
              <input
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                placeholder="IT / Finance / Healthcare"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecruiterCreateProfile;
