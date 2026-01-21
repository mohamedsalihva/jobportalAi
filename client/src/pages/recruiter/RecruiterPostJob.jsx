import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/ui/Toast";
import { API } from "../../constants/apiEndpoints";

import {
  Briefcase,
  MapPin,
  IndianRupee,
  Clock,
  Layers,
  FileText,
  Award,
} from "lucide-react";

const initialJobForm = {
  title: "",
  location: "",
  jobType: "",
  salary: "",
  experienceRequired: "",
  skills: "",
  languages: "",
  description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  workMode: "Onsite",
};

const RecruiterPostJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialJobForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isValid = useMemo(() => {
    return (
      form.title.trim() &&
      form.location.trim() &&
      form.jobType.trim() &&
      form.experienceRequired.trim() &&
      form.description.trim()
    );
  }, [form]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Job title is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.jobType.trim()) newErrors.jobType = "Job type is required";
    if (!form.experienceRequired.trim())
      newErrors.experienceRequired = "Experience is required";
    if (!form.description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toArray = (text) => {
    return text
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  };

  const buildPayload = () => {
    return {
      title: form.title.trim(),
      location: form.location.trim(),
      jobType: form.jobType,

      salary: form.salary?.trim() || "Not disclosed",
      experienceRequired: form.experienceRequired.trim(),
      description: form.description.trim(),
      workMode: form.workMode,

      skills: toArray(form.skills),
      languages: toArray(form.languages),
      responsibilities: toArray(form.responsibilities),
      requirements: toArray(form.requirements),
      benefits: toArray(form.benefits),

      isActive: true,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      const payload = buildPayload();

      await api.post(API.JOBS.CREATE, payload);

      showToast("success", "Job posted successfully ✅");

      setTimeout(() => {
        navigate("/recruiter/my-jobs");
      }, 900);
    } catch (error) {
      console.log(error);
      showToast("error", error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={hideToast}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* ✅ Header */}
        <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            Recruiter
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Post a Job
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Fill the job details below and publish your hiring post.
          </p>
        </div>

        {/* ✅ Form Card */}
        <div className="mt-6 bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ✅ Title */}
            <InputField
              label="Job Title *"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="Frontend Developer"
              error={errors.title}
              icon={<Briefcase size={16} />}
            />

            {/* ✅ Location */}
            <InputField
              label="Location *"
              value={form.location}
              onChange={handleChange("location")}
              placeholder="Kochi, Kerala"
              error={errors.location}
              icon={<MapPin size={16} />}
            />

            {/* ✅ Job Type + Work Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Job Type *"
                value={form.jobType}
                onChange={handleChange("jobType")}
                error={errors.jobType}
                icon={<Layers size={16} />}
                options={[
                  { value: "", label: "Select Job Type" },
                  { value: "Full-time", label: "Full-time" },
                  { value: "Part-time", label: "Part-time" },
                  { value: "Contract", label: "Contract" },
                  { value: "Internship", label: "Internship" },
                ]}
              />

              <SelectField
                label="Work Mode"
                value={form.workMode}
                onChange={handleChange("workMode")}
                icon={<Award size={16} />}
                options={[
                  { value: "Onsite", label: "Onsite" },
                  { value: "Remote", label: "Remote" },
                  { value: "Hybrid", label: "Hybrid" },
                ]}
              />
            </div>

            {/* ✅ Salary + Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Salary"
                value={form.salary}
                onChange={handleChange("salary")}
                placeholder="₹3 LPA - ₹6 LPA"
                icon={<IndianRupee size={16} />}
              />

              <InputField
                label="Experience Required *"
                value={form.experienceRequired}
                onChange={handleChange("experienceRequired")}
                placeholder="0-1 Years / Fresher"
                error={errors.experienceRequired}
                icon={<Clock size={16} />}
              />
            </div>

            {/* ✅ Skills + Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Skills (comma separated)"
                value={form.skills}
                onChange={handleChange("skills")}
                placeholder="React, Node.js, MongoDB"
              />

              <InputField
                label="Languages (comma separated)"
                value={form.languages}
                onChange={handleChange("languages")}
                placeholder="English, Hindi, Malayalam"
              />
            </div>

            {/* ✅ Description */}
            <TextAreaField
              label="Job Description *"
              value={form.description}
              onChange={handleChange("description")}
              placeholder="Write full job details..."
              error={errors.description}
              icon={<FileText size={16} />}
            />

            {/* ✅ Responsibilities */}
            <InputField
              label="Responsibilities (comma separated)"
              value={form.responsibilities}
              onChange={handleChange("responsibilities")}
              placeholder="Build UI, Fix bugs, Write clean code"
            />

            {/* ✅ Requirements */}
            <InputField
              label="Requirements (comma separated)"
              value={form.requirements}
              onChange={handleChange("requirements")}
              placeholder="React knowledge, Good communication"
            />

            {/* ✅ Benefits */}
            <InputField
              label="Benefits (comma separated)"
              value={form.benefits}
              onChange={handleChange("benefits")}
              placeholder="WFH, Insurance, Paid leave"
            />

            {/* ✅ Buttons */}
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
                disabled={loading || !isValid}
                className="w-full py-3 rounded-2xl bg-amber-500 text-black font-extrabold hover:bg-amber-400 transition disabled:opacity-60 shadow-md shadow-amber-500/20"
              >
                {loading ? "Posting..." : "Post Job"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
          Fields marked with * are required.
        </p>
      </div>
    </div>
  );
};

export default RecruiterPostJob;

/* ---------------- REUSABLE INPUT UI ---------------- */

const InputField = ({ label, value, onChange, placeholder, error, icon }) => {
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
        className={`mt-2 w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-none transition
        bg-white dark:bg-[#0B0B0F]/40
        text-slate-900 dark:text-white
        placeholder:text-slate-400
        ${
          error
            ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            : "border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500"
        }`}
      />

      {error && <p className="text-xs text-red-600 font-extrabold mt-1">{error}</p>}
    </div>
  );
};

const TextAreaField = ({ label, value, onChange, placeholder, error, icon }) => {
  return (
    <div>
      <label className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
        {icon ? <span className="text-slate-400">{icon}</span> : null}
        {label}
      </label>

      <textarea
        rows={5}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-2 w-full px-4 py-3 rounded-2xl border text-sm font-semibold outline-none transition resize-none
        bg-white dark:bg-[#0B0B0F]/40
        text-slate-900 dark:text-white
        placeholder:text-slate-400
        ${
          error
            ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            : "border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500"
        }`}
      />

      {error && <p className="text-xs text-red-600 font-extrabold mt-1">{error}</p>}
    </div>
  );
};

const SelectField = ({ label, value, onChange, options, error, icon }) => {
  return (
    <div>
      <label className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
        {icon ? <span className="text-slate-400">{icon}</span> : null}
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className={`mt-2 w-full px-4 py-3 rounded-2xl border text-sm font-extrabold outline-none transition
        bg-white dark:bg-[#0B0B0F]/40
        text-slate-900 dark:text-white
        ${
          error
            ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            : "border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500"
        }`}
      >
        {options.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-600 font-extrabold mt-1">{error}</p>}
    </div>
  );
};
