import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/ui/Toast"; 
import { API } from "../../constants/apiEndpoints"; 

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

      showToast("success", "Recruiter profile updated ");
      setTimeout(() => navigate("/recruiter/dashboard"), 1000);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Update failed "
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFE]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center font-bold text-slate-500">
            Loading recruiter profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFE]">
      <Navbar />

      
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={closeToast}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Edit Recruiter Profile
          </h1>

          <form onSubmit={handleUpdate} className="mt-6 space-y-4">
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
                onChange={(e) =>
                  setForm({ ...form, industry: e.target.value })
                }
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                placeholder="IT / Finance / Healthcare"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
