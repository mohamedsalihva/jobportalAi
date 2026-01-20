import React from  "react";
import { MapPin, Pencil } from "lucide-react";

const ProfileHeaderCard = ({ profile, onEdit}) =>{
    return (
 <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {profile.name}
          </h1>

          <p className="text-sm font-semibold text-slate-600 mt-1">
            {profile.headline || "Add a headline like: React Developer | Fresher"}
          </p>

          <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
            <MapPin size={16} /> {profile.location || "Add location"}
          </p>

          <p className="text-xs text-slate-400 mt-2">{profile.email}</p>
        </div>

        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-sm hover:bg-slate-50 transition flex items-center gap-2"
        >
          <Pencil size={16} /> Edit
        </button>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;