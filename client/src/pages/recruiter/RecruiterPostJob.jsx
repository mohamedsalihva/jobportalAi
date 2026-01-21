import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/ui/Toast";
import { API } from "../../constants/apiEndpoints";

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

      showToast("success", "Job posted successfully ");

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
    <div className="min-h-screen bg-[#FBFBFE]">
      <Navbar />

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={hideToast}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Post a Job
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Fill the job details below and publish.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
           
            <div>
              <label className="text-sm font-bold text-slate-700">
                Job Title *
              </label>
              <input
                value={form.title}
                onChange={handleChange("title")}
                className={`mt-2 w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ${
                  errors.title
                    ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                    : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
                }`}
                placeholder="Frontend Developer"
              />
              {errors.title && (
                <p className="text-xs text-red-600 font-bold mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            
            <div>
              <label className="text-sm font-bold text-slate-700">
                Location *
              </label>
              <input
                value={form.location}
                onChange={handleChange("location")}
                className={`mt-2 w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ${
                  errors.location
                    ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                    : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
                }`}
                placeholder="Kochi, Kerala"
              />
              {errors.location && (
                <p className="text-xs text-red-600 font-bold mt-1">
                  {errors.location}
                </p>
              )}
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Job Type *
                </label>
                <select
                  value={form.jobType}
                  onChange={handleChange("jobType")}
                  className={`mt-2 w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ${
                    errors.jobType
                      ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                      : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
                  }`}
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                {errors.jobType && (
                  <p className="text-xs text-red-600 font-bold mt-1">
                    {errors.jobType}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Work Mode
                </label>
                <select
                  value={form.workMode}
                  onChange={handleChange("workMode")}
                  className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                >
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Salary
                </label>
                <input
                  value={form.salary}
                  onChange={handleChange("salary")}
                  className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  placeholder="₹3 LPA - ₹6 LPA"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Experience Required *
                </label>
                <input
                  value={form.experienceRequired}
                  onChange={handleChange("experienceRequired")}
                  className={`mt-2 w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ${
                    errors.experienceRequired
                      ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                      : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
                  }`}
                  placeholder="0-1 Years / Fresher"
                />
                {errors.experienceRequired && (
                  <p className="text-xs text-red-600 font-bold mt-1">
                    {errors.experienceRequired}
                  </p>
                )}
              </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Skills (comma separated)
                </label>
                <input
                  value={form.skills}
                  onChange={handleChange("skills")}
                  className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Languages (comma separated)
                </label>
                <input
                  value={form.languages}
                  onChange={handleChange("languages")}
                  className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
                  placeholder="English, Hindi, Malayalam"
                />
              </div>
            </div>

           
            <div>
              <label className="text-sm font-bold text-slate-700">
                Job Description *
              </label>
              <textarea
                rows={5}
                value={form.description}
                onChange={handleChange("description")}
                className={`mt-2 w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 resize-none ${
                  errors.description
                    ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                    : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
                }`}
                placeholder="Write full job details..."
              />
              {errors.description && (
                <p className="text-xs text-red-600 font-bold mt-1">
                  {errors.description}
                </p>
              )}
            </div>

           
            <div>
              <label className="text-sm font-bold text-slate-700">
                Responsibilities (comma separated)
              </label>
              <input
                value={form.responsibilities}
                onChange={handleChange("responsibilities")}
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
                placeholder="Build UI, Fix bugs, Write clean code"
              />
            </div>

            
            <div>
              <label className="text-sm font-bold text-slate-700">
                Requirements (comma separated)
              </label>
              <input
                value={form.requirements}
                onChange={handleChange("requirements")}
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
                placeholder="React knowledge, Good communication"
              />
            </div>

           
            <div>
              <label className="text-sm font-bold text-slate-700">
                Benefits (comma separated)
              </label>
              <input
                value={form.benefits}
                onChange={handleChange("benefits")}
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
                placeholder="WFH, Insurance, Paid leave"
              />
            </div>

          
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/recruiter/dashboard")}
                className="w-full border border-slate-200 font-bold py-3 rounded-xl hover:bg-slate-50 transition"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={loading || !isValid}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? "Posting..." : "Post Job"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Fields marked with * are required.
        </p>
      </div>
    </div>
  );
};

export default RecruiterPostJob;
