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
    <div className="min-h-screen bg-[#FBFBFE]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 font-semibold">
            Loading profile...
          </div>
        ) : !profile ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-red-500 font-semibold">
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

            {/* RIGHT SIDE (Sidebar) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Profile Completion
                </p>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Add skills, summary & resume to improve your chances.
                </p>

                <button
                  onClick={() => setEditOpen(true)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
                >
                  Update Profile
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Tips
                </p>
                <ul className="mt-3 text-sm text-slate-600 space-y-2 list-disc list-inside">
                  <li>Add 5+ job-related skills</li>
                  <li>Write a strong summary</li>
                  <li>Add resume link</li>
                </ul>
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
