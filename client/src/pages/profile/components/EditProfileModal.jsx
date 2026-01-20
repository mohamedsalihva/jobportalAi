import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

const EditProfileModal = ({ open, onClose, profile, onSave }) => {
  const [form, setForm] = useState({
    phone: "",
    location: "",
    headline: "",
    summary: "",
    skills: "",
    resumeUrl: "",

    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      },
    ],

    education: [
      {
        degree: "",
        institution: "",
        location: "",
        startYear: "",
        endYear: "",
      },
    ],

    achievements: "",
    certifications: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        phone: profile.phone || "",
        location: profile.location || "",
        headline: profile.headline || "",
        summary: profile.summary || "",
        skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : "",
        resumeUrl: profile.resumeUrl || "",

        experience:
          Array.isArray(profile.experience) && profile.experience.length > 0
            ? profile.experience
            : [
                {
                  title: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  isCurrent: false,
                  description: "",
                },
              ],

        education:
          Array.isArray(profile.education) && profile.education.length > 0
            ? profile.education
            : [
                {
                  degree: "",
                  institution: "",
                  location: "",
                  startYear: "",
                  endYear: "",
                },
              ],

        achievements: Array.isArray(profile.achievements)
          ? profile.achievements.join(", ")
          : "",

        certifications: Array.isArray(profile.certifications)
          ? profile.certifications.join(", ")
          : "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  // ---------- Experience handlers ----------
  const handleExperienceChange = (index, field, value) => {
    const updated = [...form.experience];
    updated[index][field] = value;
    setForm({ ...form, experience: updated });
  };

  const addExperience = () => {
    setForm({
      ...form,
      experience: [
        ...form.experience,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = form.experience.filter((_, i) => i !== index);
    setForm({ ...form, experience: updated });
  };

  // ---------- Education handlers ----------
  const handleEducationChange = (index, field, value) => {
    const updated = [...form.education];
    updated[index][field] = value;
    setForm({ ...form, education: updated });
  };

  const addEducation = () => {
    setForm({
      ...form,
      education: [
        ...form.education,
        {
          degree: "",
          institution: "",
          location: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const updated = form.education.filter((_, i) => i !== index);
    setForm({ ...form, education: updated });
  };

  const handleSubmit = () => {
    const payload = {
      phone: form.phone,
      location: form.location,
      headline: form.headline,
      summary: form.summary,
      resumeUrl: form.resumeUrl,

      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),

      experience: form.experience.filter(
        (e) => e.title || e.company || e.startDate
      ),

      education: form.education.filter(
        (e) => e.degree || e.institution || e.startYear
      ),

      achievements: form.achievements
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),

      certifications: form.certifications
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    onSave(payload);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-3">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-extrabold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Basic Fields */}
          <div>
            <label className="text-sm font-bold text-gray-700">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Headline</label>
            <input
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="React Developer | Fresher"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Location</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="Kerala, India"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Summary</label>
            <textarea
              rows={4}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none resize-none"
              placeholder="Write your professional summary..."
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">
              Skills (comma separated)
            </label>
            <input
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Resume URL</label>
            <input
              value={form.resumeUrl}
              onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="https://drive.google.com/..."
            />
          </div>

          {/* EXPERIENCE */}
          <div className="border rounded-2xl p-4 bg-slate-50">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-extrabold text-slate-900">
                Experience
              </h3>
              <button
                onClick={addExperience}
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                + Add
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {form.experience.map((exp, idx) => (
                <div key={idx} className="bg-white border rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-slate-700">
                      Experience #{idx + 1}
                    </p>

                    {form.experience.length > 1 && (
                      <button
                        onClick={() => removeExperience(idx)}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <input
                      value={exp.title}
                      onChange={(e) =>
                        handleExperienceChange(idx, "title", e.target.value)
                      }
                      className="border rounded-xl px-3 py-2 text-sm"
                      placeholder="Job Title"
                    />

                    <input
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(idx, "company", e.target.value)
                      }
                      className="border rounded-xl px-3 py-2 text-sm"
                      placeholder="Company"
                    />

                    <input
                      value={exp.location}
                      onChange={(e) =>
                        handleExperienceChange(idx, "location", e.target.value)
                      }
                      className="border rounded-xl px-3 py-2 text-sm"
                      placeholder="Location"
                    />

                    <input
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(idx, "startDate", e.target.value)
                      }
                      className="border rounded-xl px-3 py-2 text-sm"
                      placeholder="Start Date (2024-01)"
                    />

                    {!exp.isCurrent && (
                      <input
                        value={exp.endDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            idx,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="border rounded-xl px-3 py-2 text-sm"
                        placeholder="End Date (2024-12)"
                      />
                    )}

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) =>
                          handleExperienceChange(
                            idx,
                            "isCurrent",
                            e.target.checked
                          )
                        }
                      />
                      Currently working here
                    </label>
                  </div>

                  <textarea
                    rows={3}
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(idx, "description", e.target.value)
                    }
                    className="mt-3 w-full border rounded-xl px-3 py-2 text-sm resize-none"
                    placeholder="Describe your role..."
                  />
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div className="border rounded-2xl p-4 bg-slate-50">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-extrabold text-slate-900">
                Education
              </h3>
              <button
                onClick={addEducation}
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                + Add
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {form.education.map((edu, idx) => (
                <div key={idx} className="bg-white border rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-slate-700">
                      Education #{idx + 1}
                    </p>

                    {form.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(idx)}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <input
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(idx, "degree", e.target.value)
                      }
                      className="border rounded-xl px-3 py-2 text-sm"
                      placeholder="Degree (BCA, MCA...)"
                    />

                    <input
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(
                          idx,
                          "institution",
                          e.target.value
                        )
                      }
                      className="border rounded-xl px-3 py-2 text-sm"
                      placeholder="Institution"
                    />

                    <input
                      value={edu.location}
                      onChange={(e) =>
                        handleEducationChange(idx, "location", e.target.value)
                      }
                      className="border rounded-xl px-3 py-2 text-sm"
                      placeholder="Location"
                    />

                    <input
                      value={edu.startYear}
                      onChange={(e) =>
                        handleEducationChange(idx, "startYear", e.target.value)
                      }
                      className="border rounded-xl px-3 py-2 text-sm"
                      placeholder="Start Year (2021)"
                    />

                    <input
                      value={edu.endYear}
                      onChange={(e) =>
                        handleEducationChange(idx, "endYear", e.target.value)
                      }
                      className="border rounded-xl px-3 py-2 text-sm"
                      placeholder="End Year (2024)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements + Certifications */}
          <div>
            <label className="text-sm font-bold text-gray-700">
              Achievements (comma separated)
            </label>
            <input
              value={form.achievements}
              onChange={(e) =>
                setForm({ ...form, achievements: e.target.value })
              }
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="Top 10 in Hackathon, AWS Badge..."
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">
              Certifications (comma separated)
            </label>
            <input
              value={form.certifications}
              onChange={(e) =>
                setForm({ ...form, certifications: e.target.value })
              }
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="AWS Cloud Practitioner, MongoDB..."
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditProfileModal;
