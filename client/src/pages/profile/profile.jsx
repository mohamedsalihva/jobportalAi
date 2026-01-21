import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";

import ProfileHeaderCard from "./components/profileHeaderCard";
import ProfileSummaryCard from "./components/profileSummaryCard";
import ProfileSkillsCard from "./components/profileSkillCard";
import ProfileExperienceCard from "./components/profileExperienceCard";
import ProfileEducationCard from "./components/profileEducationCard";
import ProfileResumeCard from "./components/profileResumeCard";
import EditProfileModal from "./components/EditProfileModal";
import { API } from "../../constants/apiEndpoints";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get(API.PROFILE.ME);
      setProfile(res.data.profile);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (updatedData) => {
    try {
      const res = await api.put(API.PROFILE.UPDATE, updatedData);
      setProfile(res.data.profile);
      setEditOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center text-slate-500 dark:text-slate-300 font-extrabold">
            Loading profile...
          </div>
        ) : !profile ? (
          <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-10 text-center text-red-600 dark:text-red-400 font-extrabold">
            Profile not found
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT SIDE */}
            <div className="lg:col-span-8 space-y-6">
              <ProfileHeaderCard
                profile={profile}
                onEdit={() => setEditOpen(true)}
              />

              <ProfileSummaryCard summary={profile.summary} />

              <ProfileSkillsCard skills={profile.skills} />

              <ProfileExperienceCard experience={profile.experience} />

              <ProfileEducationCard education={profile.education} />

              <ProfileResumeCard resumeUrl={profile.resumeUrl} />
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-4 space-y-6">
              {/* Profile Completion */}
              <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Profile Completion
                </p>

                <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Add skills, summary & resume to improve your chances.
                </p>

                <button
                  onClick={() => setEditOpen(true)}
                  className="mt-4 w-full bg-amber-500 text-black font-extrabold py-3 rounded-2xl hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
                >
                  Update Profile
                </button>
              </div>

              {/* Tips */}
              <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Tips
                </p>

                <ul className="mt-3 text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                  <li>Add 5+ job-related skills</li>
                  <li>Write a strong summary</li>
                  <li>Add resume link</li>
                </ul>

                <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    🔥 Pro Tip: Profiles with resume + 5 skills get shortlisted
                    faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
