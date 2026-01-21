import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/ui/Toast";
import { API } from "../../constants/apiEndpoints";

import { Building2, MapPin, Globe, LayoutGrid, Pencil } from "lucide-react";

const RecruiterProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    companyLocation: "",
    companyWebsite: "",
    industry: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get(API.RECRUITER.MY_PROFILE);

      setForm({
        companyName: res.data?.data?.companyName || "",
        companyLocation: res.data?.data?.companyLocation || "",
        companyWebsite: res.data?.data?.companyWebsite || "",
        industry: res.data?.data?.industry || "",
      });
    } catch (error) {
      showToast("error", "Recruiter profile not found. Create profile first.");
      setTimeout(() => navigate("/recruiter/create-profile"), 1200);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await api.put(API.RECRUITER.UPDATE, form);

      showToast("success", "Recruiter profile updated ✅");
      setTimeout(() => navigate("/recruiter/dashboard"), 1000);
    } catch (error) {
      showToast("error", error.response?.data?.message || "Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center font-extrabold text-slate-500 dark:text-slate-300">
            Loading recruiter profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={closeToast}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* ✅ Header */}
        <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            Recruiter
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Edit Recruiter Profile
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Update your company information. This appears on your job posts.
          </p>
        </div>

        {/* ✅ Form */}
        <div className="mt-6 bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Company Name */}
            <InputField
              label="Company Name"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              placeholder="TCS / Infosys / Startup Name"
              icon={<Building2 size={16} />}
              required
            />

            {/* Company Location */}
            <InputField
              label="Company Location"
              value={form.companyLocation}
              onChange={(e) =>
                setForm({ ...form, companyLocation: e.target.value })
              }
              placeholder="Kochi, Kerala"
              icon={<MapPin size={16} />}
              required
            />

            {/* Company Website */}
            <InputField
              label="Company Website (optional)"
              value={form.companyWebsite}
              onChange={(e) =>
                setForm({ ...form, companyWebsite: e.target.value })
              }
              placeholder="https://company.com"
              icon={<Globe size={16} />}
            />

            {/* Industry */}
            <InputField
              label="Industry (optional)"
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
              placeholder="IT / Finance / Healthcare"
              icon={<LayoutGrid size={16} />}
            />

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/recruiter/dashboard")}
                className="w-full py-3 rounded-2xl border border-slate-200 dark:border-white/10 font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-2xl bg-amber-500 text-black font-extrabold hover:bg-amber-400 transition disabled:opacity-60 shadow-md shadow-amber-500/20 inline-flex items-center justify-center gap-2"
              >
                <Pencil size={16} />
                {saving ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
          Tip: Add a website + industry to make your profile look more trusted.
        </p>
      </div>
    </div>
  );
};

export default RecruiterProfile;

/* ✅ Reusable Input Field */
const InputField = ({ label, value, onChange, placeholder, icon, required }) => {
  return (
    <div>
      <label className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
        {icon ? <span className="text-slate-400">{icon}</span> : null}
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-none transition
          bg-white dark:bg-[#0B0B0F]/40
          text-slate-900 dark:text-white
          placeholder:text-slate-400
          border-slate-200 dark:border-white/10
          focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500"
      />
    </div>
  );
};
