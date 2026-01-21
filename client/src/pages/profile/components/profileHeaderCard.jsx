import React from "react";
import { MapPin, Pencil } from "lucide-react";

const ProfileHeaderCard = ({ profile, onEdit }) => {
  return (
    <div className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            My Profile
          </p>

          <h1 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white truncate">
            {profile.name}
          </h1>

          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
            {profile.headline || "Add a headline like: React Developer | Fresher"}
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
            <MapPin size={16} className="text-slate-400 dark:text-slate-500" />
            {profile.location || "Add location"}
          </p>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 truncate">
            {profile.email}
          </p>
        </div>

        <button
          onClick={onEdit}
          className="shrink-0 px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 
          bg-white dark:bg-[#0B0B0F]/40
          text-slate-800 dark:text-slate-200 font-extrabold text-sm 
          hover:bg-slate-50 dark:hover:bg-white/5 transition flex items-center gap-2"
        >
          <Pencil size={16} /> Edit
        </button>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
